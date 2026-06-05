variable "mongodb_atlas_public_key" {
  description = "MongoDB Atlas public API key"
  type        = string
  sensitive   = true
}

variable "mongodb_atlas_private_key" {
  description = "MongoDB Atlas private API key"
  type        = string
  sensitive   = true
}

variable "mongodb_atlas_org_id" {
  description = "MongoDB Atlas organization ID"
  type        = string
}

variable "mongodb_uri" {
  description = "Connection string for MongoDB Atlas"
  type        = string
  sensitive   = true
}

variable "render_api_key" {
  description = "Render API key for provisioning services"
  type        = string
  sensitive   = true
}

variable "render_deploy_hook" {
  description = "Render deploy hook URL for notifications"
  type        = string
}

variable "vercel_token" {
  description = "Vercel token for project management"
  type        = string
  sensitive   = true
}

variable "vercel_org_id" {
  description = "Vercel organization ID"
  type        = string
}

variable "vercel_project_id" {
  description = "Vercel project ID"
  type        = string
}

variable "project_name" {
  description = "Project name used across providers"
  type        = string
  default     = "laundry-app"
}

variable "mongo_project_name" {
  description = "MongoDB Atlas project name"
  type        = string
  default     = "LaundryAppAtlasProject"
}

variable "render_service_name" {
  description = "Render web service name"
  type        = string
  default     = "laundry-backend"
}

variable "vercel_project_name" {
  description = "Vercel project name"
  type        = string
  default     = "laundry-frontend"
}
