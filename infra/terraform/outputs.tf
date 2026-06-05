output "mongodb_project_id" {
  value = mongodbatlas_project.main.id
}

output "mongodb_cluster_name" {
  value = mongodbatlas_cluster.main.name
}

output "render_service_url" {
  value = "https://${render_service.backend.name}.onrender.com"
}

output "vercel_project_id" {
  value = vercel_project.frontend.id
}

output "vercel_project_url" {
  value = "https://${vercel_project.frontend.name}.vercel.app"
}
