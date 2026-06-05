# Infraestructura Terraform

Este directorio contiene la infraestructura como código para MongoDB Atlas, Render y Vercel.

## Estructura

- `providers.tf` - configuración de providers y autenticación.
- `variables.tf` - variables utilizadas por los recursos.
- `main.tf` - recursos de Atlas, Render y Vercel.
- `outputs.tf` - salidas de infraestructura.
- `terraform.tfvars.example` - plantilla de variables.

## Uso

1. Copiar `terraform.tfvars.example` a `terraform.tfvars`.
2. Rellenar los secrets en el archivo de variables.
3. Ejecutar:
   - `terraform init`
   - `terraform plan -var-file=terraform.tfvars`
   - `terraform apply -var-file=terraform.tfvars`

## Recursos

- MongoDB Atlas: proyecto, cluster M0, usuario y whitelist.
- Render: servicio web backend .NET con health check `/health`.
- Vercel: proyecto frontend con variable `VITE_API_URL` apuntando a Render.
