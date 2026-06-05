resource "mongodbatlas_project" "main" {
  name   = var.mongo_project_name
  org_id = var.mongodb_atlas_org_id
}

resource "mongodbatlas_cluster" "main" {
  project_id            = mongodbatlas_project.main.id
  name                  = "LaundryCluster"
  provider_name         = "GCP"
  provider_region_name  = "US_EAST_1"
  disk_size_gb          = 5
  cluster_type          = "REPLICASET"
  replication_factor    = 3
  auto_scaling_disk_gb_enabled = false
  backup_enabled        = false
  provider_instance_size_name = "M0"
}

resource "mongodbatlas_database_user" "api_user" {
  project_id = mongodbatlas_project.main.id
  username   = "laundry_api_user"
  password   = random_password.mongo_user.result
  auth_database_name = "admin"
  roles {
    role_name     = "readWrite"
    database_name = "LaundryDb"
  }
}

resource "mongodbatlas_project_ip_whitelist" "default" {
  project_id = mongodbatlas_project.main.id
  ip_address = "0.0.0.0/0"
  comment    = "Allow all apps to connect during initial provisioning"
}

resource "random_password" "mongo_user" {
  length           = 32
  special          = true
  override_special = "!@#$%&*()-_+="
}

resource "render_service" "backend" {
  name                = var.render_service_name
  env                 = "docker"
  repo_branch         = "main"
  auto_deploy         = true
  service_type        = "web_service"
  region              = "oregon"
  instance_type       = "starter"
  env_vars = {
    MONGODB_URI = var.mongodb_uri
    PORT        = "5000"
  }
  health_check_path = "/health"
  build_command     = "dotnet build ./backend/src/LaundryApi/LaundryApi.csproj"
  start_command     = "dotnet run --project ./backend/src/LaundryApi/LaundryApi.csproj"
}

resource "vercel_project" "frontend" {
  name             = var.vercel_project_name
  framework        = "vite"
  repo             = "https://github.com/gianfrancoarocutipa-beep/PracticaEx"
  production_branch = "main"
  organization_id  = var.vercel_org_id
}

resource "vercel_env" "api_url" {
  project_id = vercel_project.frontend.id
  type       = "encrypted"
  key        = "VITE_API_URL"
  value      = "https://${render_service.backend.name}.onrender.com"
}
