import React from 'react';
import styles from './Footer.module.css';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter
} from 'react-icons/fa';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    url: 'https://www.facebook.com/nuevopactocs/'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    url: 'http://instagram.com/colegionuevopacto/'
  },
  {
    name: 'YouTube',
    icon: <FaYoutube />,
    url: 'https://www.youtube.com/@nuevopactochristianschool8912/'
  },
  {
    name: 'Twitter/X',
    icon: <FaTwitter />,
    url: 'https://twitter.com/focoeducativo360'
  }
];

const SocialLinks: React.FC = () => {
  return (
    <div className={styles.socialLinks}>
      <div className={styles.socialIcons}>
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Síguenos en ${link.name}`}
            title={`${link.name} - Christian School Nuevo Pacto`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;