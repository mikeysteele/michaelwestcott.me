import { LitElement, html, css } from 'lit';
import {
  faLinkedin,
  faStackOverflow,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import '../shared/fa-icon/fa-icon.element';
import { Link } from 'src/models/Link';

library.add(faLinkedin, faStackOverflow, faGithub);

@customElement('resume-sidebar')
export class ResumeSidebarElement extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 20px;
        background: var(--app-sidebar-background);       
        padding: 2.5rem;
        color: var(--app-sidebar-text-color);
        align-items: center;
        height: 100%;
      }

      h1,
      h2 {
        margin: 0;
      }
      h3 {
        font-size: 1rem;
      }
      .socials {
        display: flex;
        justify-content: left;
        width: 100%;
        gap: 10px;
      }
      fa-icon {
        font-size: 1rem;
        color: #fff;
      }
      img {
        width: 165px;
        height: 165px;
        border-radius: 50%;
        display: block;
      }
      .links {
        width: 100%;
      }
      .links ul {
        padding: 0;
        list-style: none;
      }
      .links a {
        color: var(--app-sidebar-text-color) !important;
        text-transform: uppercase;
        font-size: 0.85rem;
        text-decoration: none;
        letter-spacing: 2px;
        line-height: 2.5;
      }
      @media print {
        .links {
          display: none;
        }
        .socials {
          display: none
        }
        a[href]::after {
          content: " (" attr(href) ")"; 
          color: #fff;
        }
      }
      
    `,
  ];

  private readonly icons: { [key: string]: IconDefinition } = {
    linkedin: faLinkedin,
    github: faGithub,
    stackoverflow: faStackOverflow,
  };
  @property() imageUrl?: string;
  @property() name?: string;
  @property() headline?: string;

  @property() socials?: Link[];
  @property() links: Map<string, string> = new Map<string, string>();

  linkClicked(event: MouseEvent, link: string) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('linkClicked', { detail: link }));
  }

  render() {
    return html`
      <img src="/assets/images/${this.imageUrl}" alt="${this.name} photo" />
      <section class="name">
        <h1>${this.name}</h1>
        <div>${this.headline}</div>
      </section>
      <section class="socials">
        ${this.socials?.map(
          ({ name, link, linkText }) => html`<a
            href="${link}"
            target="_blank"
            rel="noopener"
            title="${name} ${linkText}"
          >
            <fa-icon
              icon="${this.icons[name].iconName}"
              prefix="${this.icons[name].prefix}"
            ></fa-icon>
          </a>`
        )}
      </section>
      <section class="links">
        <ul>
          ${[...this.links].map(
            ([link, name]) => html`<li>
              <a
                href="${link}"
                @click=${(e: MouseEvent) => this.linkClicked(e, link)}
                >${name}</a
              >
            </li>`
          )}
        </ul>
      </section>
    `;
  }
}
