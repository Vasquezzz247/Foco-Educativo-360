import React, { useMemo } from 'react';
import styles from './Section.module.css';
import Container from './Container';

export type SectionVariant = 
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'light'
  | 'dark'
  | 'gradient'
  | 'transparent';

export type SectionPadding = 
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';

export type SectionSpacing = 
  | 'none'
  | 'tight'
  | 'normal'
  | 'loose'
  | 'extra';

export type SectionAlignment = 
  | 'left'
  | 'center'
  | 'right'
  | 'stretch';

export type SectionOverflow = 
  | 'visible'
  | 'hidden'
  | 'scroll'
  | 'auto';

export interface SectionProps {
  children: React.ReactNode;
  
  // Variantes visuales
  variant?: SectionVariant;
  background?: 'solid' | 'gradient' | 'image' | 'none';
  backgroundImage?: string;
  backgroundOpacity?: number;
  
  // Layout
  padding?: SectionPadding;
  paddingTop?: SectionPadding;
  paddingBottom?: SectionPadding;
  paddingY?: SectionPadding;
  marginTop?: SectionSpacing;
  marginBottom?: SectionSpacing;
  marginY?: SectionSpacing;
  
  // Contenido
  align?: SectionAlignment;
  overflow?: SectionOverflow;
  fullWidth?: boolean;
  fullHeight?: boolean;
  minHeight?: string;
  maxWidth?: string;
  
  // Container
  container?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  // Decoración
  dividerTop?: boolean;
  dividerBottom?: boolean;
  dividerColor?: string;
  pattern?: 'dots' | 'grid' | 'lines' | 'waves' | 'none';
  patternOpacity?: number;
  
  // Identificación
  id?: string;
  className?: string;
  ariaLabel?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  
  // Variantes visuales
  variant = 'default',
  background = 'solid',
  backgroundImage,
  backgroundOpacity = 0.4,
  
  // Layout
  padding = 'xl',
  paddingTop,
  paddingBottom,
  paddingY,
  marginTop = 'normal',
  marginBottom = 'normal',
  marginY,
  
  // Contenido
  align = 'center',
  overflow = 'visible',
  fullWidth = false,
  fullHeight = false,
  minHeight,
  maxWidth,
  
  // Container
  container = true,
  containerSize = 'lg',
  
  // Decoración
  dividerTop = false,
  dividerBottom = false,
  dividerColor = 'var(--color-border)',
  pattern = 'none',
  patternOpacity = 0.05,
  
  // Identificación
  id,
  className = '',
  ariaLabel,
}) => {
  // Calcular padding
  const paddingTopClass = paddingTop || paddingY || padding;
  const paddingBottomClass = paddingBottom || paddingY || padding;
  
  // Calcular margin
  const marginTopClass = marginY || marginTop;
  const marginBottomClass = marginY || marginBottom;

  // Clases CSS dinámicas
  const sectionClasses = useMemo(() => {
    const classes = [
      styles.section,
      styles[variant],
      styles[`bg-${background}`],
      styles[`padding-top-${paddingTopClass}`],
      styles[`padding-bottom-${paddingBottomClass}`],
      styles[`margin-top-${marginTopClass}`],
      styles[`margin-bottom-${marginBottomClass}`],
      styles[`align-${align}`],
      styles[`overflow-${overflow}`],
      styles[`pattern-${pattern}`],
    ];

    // Clases condicionales
    if (backgroundImage) classes.push(styles.hasBackgroundImage);
    if (fullWidth) classes.push(styles.fullWidth);
    if (fullHeight) classes.push(styles.fullHeight);
    if (dividerTop) classes.push(styles.dividerTop);
    if (dividerBottom) classes.push(styles.dividerBottom);
    if (className) classes.push(className);
    
    // Clases para dimensiones
    if (minHeight) classes.push(styles[`min-height-${minHeight}`]);
    if (maxWidth) classes.push(styles[`max-width-${maxWidth}`]);

    return classes.join(' ');
  }, [
    variant,
    background,
    paddingTopClass,
    paddingBottomClass,
    marginTopClass,
    marginBottomClass,
    align,
    overflow,
    pattern,
    backgroundImage,
    fullWidth,
    fullHeight,
    dividerTop,
    dividerBottom,
    className,
    minHeight,
    maxWidth,
  ]);

  // Background image vía data attributes
  const dataAttributes = useMemo(() => {
    const attrs: Record<string, string> = {};
    
    if (backgroundImage) {
      attrs['data-bg-image'] = backgroundImage;
    }
    
    if (backgroundOpacity !== 0.4) {
      attrs['data-bg-opacity'] = backgroundOpacity.toString();
    }
    
    if (dividerColor !== 'var(--color-border)') {
      attrs['data-divider-color'] = dividerColor;
    }
    
    if (patternOpacity !== 0.05) {
      attrs['data-pattern-opacity'] = patternOpacity.toString();
    }
    
    return attrs;
  }, [backgroundImage, backgroundOpacity, dividerColor, patternOpacity]);

  const renderContent = () => {
    if (container) {
      return (
        <Container size={containerSize}>
          <div className={styles.contentWrapper}>
            {children}
          </div>
        </Container>
      );
    }
    
    return (
      <div className={styles.contentWrapper}>
        {children}
      </div>
    );
  };

  return (
    <section
      id={id}
      className={sectionClasses}
      {...dataAttributes}
      aria-label={ariaLabel}
      {...(ariaLabel ? { role: 'region' } : {})}
    >
      {/* Overlay para opacidad de background */}
      {background === 'image' && (
        <div className={styles.backgroundOverlay} />
      )}
      
      {/* Patrón decorativo */}
      {pattern !== 'none' && (
        <div className={styles.patternOverlay} />
      )}
      
      {/* Contenido */}
      {renderContent()}
    </section>
  );
};

export default Section;