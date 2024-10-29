Uma plataforma moderna de compartilhamento de vídeo-aulas construída com Next.js e Supabase

## Funcionalidades

- 🎥 Upload e streaming de vídeos
- 👥 Autenticação e perfis de usuários
- 📱 Design responsivo
- 🎨 Player de vídeo personalizado

## Tecnologias

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Supabase
- **Autenticação**: Supabase Auth
- **Banco de Dados**: PostgreSQL (via Supabase)
- **Armazenamento**: Supabase Storage
- **Deploy**: Vercel

## Começando

1. Clone o repositório

   ```bash
   git clone https://github.com/seunome/video-hub.git
   ```

2. Instale as dependências

   ```bash
   cd video-hub
   npm install
   ```

3. Configure as variáveis de ambiente

   Renomeie `.env.local.example` para `.env.local` e atualize:

   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
   ```

4. Execute o servidor de desenvolvimento

   ```bash
   npm run dev
   ```

   Acesse [localhost:3000](http://localhost:3000) para ver a aplicação.

## Estrutura do Projeto

```
video-hub/
├── app/
│   ├── components/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── public/
├── types/
└── utils/
```

## Funcionalidades Planejadas

- [ ] Sistema de likes e dislikes
- [ ] Playlists personalizadas
- [ ] Compartilhamento em redes sociais
- [ ] Modo escuro/claro
- [ ] Sistema de inscrições
- [ ] Legendas automáticas

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

- Nome - [diegolopes087@email.com]
- Link do Projeto: [https://github.com/diego-lds/video-hub](https://github.com/diego-lds/video-hub)
