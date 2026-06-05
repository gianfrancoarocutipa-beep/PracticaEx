# PracticaEx

## Descripción

Proyecto full stack con backend .NET 8, MongoDB Atlas y frontend React + TypeScript + Tailwind CSS.

## Arquitectura

```mermaid
flowchart LR
  A[GitHub Main] --> B[Render (Backend .NET)]
  A --> C[Vercel (Frontend React)]
  B --> D[MongoDB Atlas (Base de datos)]
```

## Secrets

| Nombre | Dónde obtenerlo | Para qué |
| --- | --- | --- |
| `MONGODB_URI` | MongoDB Atlas | Cadena de conexión para backend y migraciones |
| `MONGODB_ATLAS_PUBLIC_KEY` | MongoDB Atlas API Keys | Permitir provisioning de Atlas en Terraform |
| `MONGODB_ATLAS_PRIVATE_KEY` | MongoDB Atlas API Keys | Permitir provisioning de Atlas en Terraform |
| `MONGODB_ATLAS_ORG_ID` | MongoDB Atlas | Identificador de organización Atlas para Terraform |
| `RENDER_API_KEY` | Render dashboard | Provisionar servicio backend en Terraform |
| `RENDER_DEPLOY_HOOK` | Render dashboard | Disparar despliegue backend desde GitHub Actions |
| `VERCEL_TOKEN` | Vercel dashboard | Autenticación de despliegue frontend en GitHub Actions |
| `VERCEL_ORG_ID` | Vercel dashboard | Organización Vercel para Terraform y CLI |
| `VERCEL_PROJECT_ID` | Vercel dashboard | Proyecto frontend Vercel para Terraform y CLI |

## Cómo correr localmente

1. Copiar `.env.example` a `.env` en `/backend`
2. Ejecutar `dotnet run --project backend/src/LaundryApi/LaundryApi.csproj`
3. Ejecutar `cd frontend && npm install && npm run dev`

## URLs

- Repositorio: https://github.com/gianfrancoarocutipa-beep/PracticaEx
- Render backend: https://laundry-backend.onrender.com
- Vercel frontend: https://laundry-frontend.vercel.app
