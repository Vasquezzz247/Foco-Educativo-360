import React from 'react';
import styles from './Footer.module.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

interface ContactInfoProps {
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ className = '' }) => {
  const contactItems = [
    {
      icon: <FaMapMarkerAlt />,
      text: 'Antigua Calle Ferrocarril, Colonia 3 de Mayo, San Salvador',
      subtext: '',
      label: 'Dirección'
    },
    {
      icon: <FaPhone />,
      text: '2205 7416',
      label: 'Teléfono',
      href: 'tel:+50322057416'
    },
    {
      icon: <FaEnvelope />,
      text: 'colegionuevopacto@gmail.com',
      label: 'Email',
      href: 'mailto:colegionuevopacto@gmail.com'
    }
  ];

  return (
    <div className={`${styles.contactInfo} ${className}`}>
      {contactItems.map((item, index) => (
        <div key={index} className={styles.contactItem}>
          <div className={styles.contactIcon}>{item.icon}</div>
          <div className={styles.contactText}>
            {item.href ? (
              <a href={item.href} className={styles.contactLink}>
                {item.text}
              </a>
            ) : (
              <div className={styles.contactContent}>
                <span>{item.text}</span>
                {item.subtext && <span className={styles.contactSubtext}>{item.subtext}</span>}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;