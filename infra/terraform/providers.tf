terraform {
  required_version = ">= 1.4.0"

  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 1.4"
    }
    render = {
      source  = "render-oss/render"
      version = "~> 0.3"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.6"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}

provider "mongodbatlas" {
  public_key  = var.mongodb_atlas_public_key
  private_key = var.mongodb_atlas_private_key
  org_id      = var.mongodb_atlas_org_id
}

provider "render" {
  api_key = var.render_api_key
}

provider "vercel" {
  token = var.vercel_token
}
