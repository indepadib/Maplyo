import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Maplyo | Livret d\'Accueil',
    short_name: 'Maplyo',
    description: 'Le guide de bienvenue numérique pour vos voyageurs.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617', // slate-950
    theme_color: '#020617',
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
