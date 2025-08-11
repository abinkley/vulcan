# Vulcan Cycling Static Site

This is a static website for Vulcan Cycling, a junior cycling team. The site includes a public-facing website and an admin panel for content management.

## Directory Structure

- `index.html` - Main homepage
- `images/` - Contains all images used in the site
- `admin/` - Admin panel for content management
  - `index.html` - Admin login page
  - `dashboard.html` - Admin dashboard
  - `add-content.html` - Form for adding new content
  - `manage-content.html` - Page for managing existing content

## Development

To start a local development server:

```bash
./serve.sh
```

This will start a server at http://localhost:8000

## Deployment

To prepare the site for deployment:

```bash
./deploy.sh
```

This will create a `deploy` directory with all the necessary files for deployment.

### Deploying to a Web Server

```bash
scp -r deploy/* user@your-server:/path/to/webroot/
```

### Deploying to GitHub Pages

For a simplified GitHub Pages deployment process, use:

```bash
./deploy-to-github.sh
```

This script will:
1. Run the deploy.sh script to prepare files
2. Initialize a Git repository in the deploy directory
3. Create necessary GitHub Pages files (.nojekyll, CNAME)
4. Commit and push to the gh-pages branch
5. Set up the repository URL if needed

## Admin Panel

The admin panel is accessible at `/admin/index.html`. This is a simple static implementation with no backend, so authentication is simulated.

## Customization

- Update the logo in `images/vulcan-logo.svg`
- Change the color scheme by modifying the CSS variables in the stylesheets
- Add new pages by creating HTML files and linking them in the navigation

## License

All rights reserved. This project is proprietary and confidential. 