import type { Schema, Attribute } from '@strapi/strapi';

export interface AlbumLink extends Schema.Component {
  collectionName: 'components_album_links';
  info: {
    displayName: 'links';
    description: '';
    icon: 'bulletList';
  };
  attributes: {
    albums: Attribute.Relation<'album.link', 'oneToMany', 'api::album.album'>;
  };
}

export interface AlbumSections extends Schema.Component {
  collectionName: 'components_album_sections';
  info: {
    displayName: 'gallery';
    description: '';
    icon: 'apps';
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.RichText;
    gallery: Attribute.Media;
  };
}

export interface CvComponentsEntry extends Schema.Component {
  collectionName: 'components_cv_components_entries';
  info: {
    displayName: 'entry';
    icon: 'ad';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    place: Attribute.String;
    years: Attribute.String;
    bullets: Attribute.RichText;
    image: Attribute.Media;
    type: Attribute.Enumeration<['Experience', 'Inline list', 'Bullets']> &
      Attribute.Required &
      Attribute.DefaultTo<'Experience'>;
    show_on_website: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface CvComponentsSection extends Schema.Component {
  collectionName: 'components_cv_components_sections';
  info: {
    displayName: 'section';
    description: '';
  };
  attributes: {
    entries: Attribute.Component<'cv-components.entry', true>;
    title: Attribute.String & Attribute.Required;
    color: Attribute.String & Attribute.Required & Attribute.DefaultTo<'red'>;
  };
}

export interface HomepageComponentsAboutSection extends Schema.Component {
  collectionName: 'components_homepage_components_about_sections';
  info: {
    displayName: 'About';
    description: '';
  };
  attributes: {
    bio: Attribute.Text;
  };
}

export interface HomepageComponentsBlog extends Schema.Component {
  collectionName: 'components_homepage_components_blogs';
  info: {
    displayName: 'blog';
    description: '';
  };
  attributes: {
    enabled: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

export interface HomepageComponentsHeroLink extends Schema.Component {
  collectionName: 'components_homepage_components_hero_links';
  info: {
    displayName: 'hero-link';
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String;
    icon: Attribute.Media;
  };
}

export interface HomepageComponentsHero extends Schema.Component {
  collectionName: 'components_homepage_components_heroes';
  info: {
    displayName: 'hero';
    description: '';
  };
  attributes: {
    avatar: Attribute.Media;
    socials: Attribute.Relation<
      'homepage-components.hero',
      'oneToMany',
      'api::social.social'
    >;
    headline: Attribute.RichText;
    subtitle: Attribute.RichText;
    background: Attribute.Media;
  };
}

export interface HomepageComponentsPhotography extends Schema.Component {
  collectionName: 'components_homepage_components_photographies';
  info: {
    displayName: 'Photography';
    description: '';
  };
  attributes: {
    albums: Attribute.Relation<
      'homepage-components.photography',
      'oneToMany',
      'api::album.album'
    >;
    enabled: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

export interface HomepageComponentsProjects extends Schema.Component {
  collectionName: 'components_homepage_components_projects';
  info: {
    displayName: 'Projects';
    description: '';
  };
  attributes: {
    category: Attribute.String;
    projects: Attribute.Relation<
      'homepage-components.projects',
      'oneToMany',
      'api::project.project'
    >;
    enabled: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

export interface HomepageComponentsSkills extends Schema.Component {
  collectionName: 'components_homepage_components_skills';
  info: {
    displayName: 'skills';
    description: '';
  };
  attributes: {
    category: Attribute.String;
    tools: Attribute.Relation<
      'homepage-components.skills',
      'oneToMany',
      'api::tool.tool'
    >;
    enabled: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

export interface MenuLink extends Schema.Component {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    icon: Attribute.Media;
    color: Attribute.String & Attribute.Required & Attribute.DefaultTo<'red'>;
  };
}

export interface PostSection extends Schema.Component {
  collectionName: 'components_post_sections';
  info: {
    displayName: 'section';
    description: '';
  };
  attributes: {
    text: Attribute.RichText;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media & Attribute.Required;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface ToolsTool extends Schema.Component {
  collectionName: 'components_tools_tools';
  info: {
    displayName: 'tool';
  };
  attributes: {
    name: Attribute.String;
    icon_light: Attribute.Media;
    icon_dark: Attribute.Media;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'album.link': AlbumLink;
      'album.sections': AlbumSections;
      'cv-components.entry': CvComponentsEntry;
      'cv-components.section': CvComponentsSection;
      'homepage-components.about-section': HomepageComponentsAboutSection;
      'homepage-components.blog': HomepageComponentsBlog;
      'homepage-components.hero-link': HomepageComponentsHeroLink;
      'homepage-components.hero': HomepageComponentsHero;
      'homepage-components.photography': HomepageComponentsPhotography;
      'homepage-components.projects': HomepageComponentsProjects;
      'homepage-components.skills': HomepageComponentsSkills;
      'menu.link': MenuLink;
      'post.section': PostSection;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'tools.tool': ToolsTool;
    }
  }
}
