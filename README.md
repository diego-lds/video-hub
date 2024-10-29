```md
<h1 align="center">Video Hub</h1>

<p align="center">
 Uma plataforma moderna de compartilhamento de vídeos construída com Next.js e Supabase
</p>

<p align="center">
  <a href="#funcionalidades"><strong>Funcionalidades</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#tecnologias"><strong>Tecnologias</strong></a> ·
  <a href="#começando"><strong>Começando</strong></a> ·
  <a href="#contribuindo"><strong>Contribuindo</strong></a>
</p>
<br/>

## Funcionalidades

- 🎥 Upload e streaming de vídeos
- 👥 Autenticação e perfis de usuários
- 💬 Comentários e interações
- 📱 Design responsivo
- 🔍 Funcionalidade de busca
- 📊 Painel de análises
- 🎨 Player de vídeo personalizado
- 🔔 Notificações em tempo real

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

## Contribuindo

1. Faça um Fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/NovaFuncionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

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
