import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageLayout from '../../components/layout/PageLayout';
import Card from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import backgroundImage from '../../assets/images/background/background-site.png';
import styles from './RegisterPage.module.css';

// Tipos de roles disponibles
type UserRole = 'public' | 'student' | 'teacher';

// Interfaz para los datos del formulario
interface RegisterFormData {
  // Campos comunes
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  
  // Campos específicos para estudiantes
  studentGrade?: string;
  studentClass?: 'A' | 'B';
  studentTeacherId?: string;
  
  // Campos específicos para docentes
  teacherSubjects?: string[];
  teacherGrades?: string[];
  teacherClasses?: ('A' | 'B')[];
}

// Opciones para grados escolares
const GRADE_OPTIONS = [
  '1° Grado', '2° Grado', '3° Grado', '4° Grado', 
  '5° Grado', '6° Grado', '7° Grado', '8° Grado',
  '9° Grado', '10° Grado', '11° Grado', '12° Grado'
];

// Opciones para clases
const CLASS_OPTIONS: ('A' | 'B')[] = ['A', 'B'];

// Lista de docentes mock (esto debería venir de una API)
const MOCK_TEACHERS = [
  { id: 'teacher-001', name: 'María González' },
  { id: 'teacher-002', name: 'Juan Pérez' },
  { id: 'teacher-003', name: 'Laura Sánchez' }
];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  // Estado del formulario
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'public',
    phone: '',
    bio: '',
    studentGrade: '',
    studentClass: 'A',
    studentTeacherId: '',
    teacherSubjects: [],
    teacherGrades: [],
    teacherClasses: []
  });
  
  // Estados de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Validaciones en tiempo real
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Calcular fuerza de contraseña
  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) return null;
    
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length >= 8 && hasLetters && hasNumbers && hasSpecial) {
      return 'strong';
    } else if (password.length >= 6 && ((hasLetters && hasNumbers) || (hasLetters && hasSpecial))) {
      return 'medium';
    } else {
      return 'weak';
    }
  };

  // Validar email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validar teléfono
  const validatePhone = (phone: string) => {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    return phone === '' || re.test(phone);
  };

  // Manejar cambios en campos comunes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validaciones en tiempo real
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        setFieldErrors(prev => ({ ...prev, email: 'Email no válido' }));
      } else {
        setFieldErrors(prev => ({ ...prev, email: '' }));
      }
    }
    
    if (name === 'phone' && value) {
      if (!validatePhone(value)) {
        setFieldErrors(prev => ({ ...prev, phone: 'Teléfono no válido' }));
      } else {
        setFieldErrors(prev => ({ ...prev, phone: '' }));
      }
    }
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setFieldErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
      } else if (value && formData.confirmPassword && value === formData.confirmPassword) {
        setFieldErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
    
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setFieldErrors(prev => ({ ...prev, confirmPassword: 'Las contraseñas no coinciden' }));
      } else {
        setFieldErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  // Manejar cambio de rol
  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
    setCurrentStep(1); // Resetear al paso 1 al cambiar rol
  };

  // Manejar selección de materias para docentes
  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      teacherSubjects: prev.teacherSubjects?.includes(subject)
        ? prev.teacherSubjects.filter(s => s !== subject)
        : [...(prev.teacherSubjects || []), subject]
    }));
  };

  // Validar formulario según rol
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Campos comunes
    if (!formData.name.trim()) errors.name = 'Nombre requerido';
    if (!formData.email.trim()) errors.email = 'Email requerido';
    else if (!validateEmail(formData.email)) errors.email = 'Email no válido';
    
    if (!formData.password) errors.password = 'Contraseña requerida';
    else if (formData.password.length < 6) errors.password = 'Mínimo 6 caracteres';
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (!acceptTerms) errors.terms = 'Debes aceptar los términos';
    
    // Validaciones específicas por rol
    if (formData.role === 'student') {
      if (!formData.studentGrade) errors.studentGrade = 'Grado requerido';
      if (!formData.studentClass) errors.studentClass = 'Clase requerida';
      if (!formData.studentTeacherId) errors.studentTeacherId = 'Docente requerido';
    }
    
    if (formData.role === 'teacher') {
      if (!formData.teacherSubjects?.length) errors.teacherSubjects = 'Selecciona al menos una materia';
      if (!formData.teacherGrades?.length) errors.teacherGrades = 'Selecciona al menos un grado';
      if (!formData.teacherClasses?.length) errors.teacherClasses = 'Selecciona al menos una clase';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Por favor completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Preparar datos según el rol
      const registerData: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        bio: formData.bio || undefined,
        role: formData.role
      };
      
      // Añadir datos específicos según rol
      if (formData.role === 'student') {
        registerData.studentInfo = {
          grade: formData.studentGrade,
          class: formData.studentClass,
          teacherId: formData.studentTeacherId
        };
      } else if (formData.role === 'teacher') {
        registerData.teacherInfo = {
          subjects: formData.teacherSubjects,
          grades: formData.teacherGrades,
          classes: formData.teacherClasses
        };
      }
      
      const result = await register(
        registerData.name,
        registerData.email,
        registerData.password,
        registerData.phone,
        registerData.bio,
        registerData.role,
        registerData.studentInfo,
        registerData.teacherInfo
      );
      
      setSuccess(result.message || '¡Registro exitoso! Serás redirigido...');
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Error en el registro. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Renderizar selector de rol
  const renderRoleSelector = () => (
    <div className={styles.roleSelector}>
      <button
        type="button"
        className={`${styles.roleOption} ${formData.role === 'public' ? styles.active : ''}`}
        onClick={() => handleRoleChange('public')}
      >
        <span className={styles.roleIcon}>👤</span>
        <span className={styles.roleName}>Usuario General</span>
        <span className={styles.roleDesc}>Acceso a contenido público y comentarios</span>
      </button>
      
      <button
        type="button"
        className={`${styles.roleOption} ${formData.role === 'student' ? styles.active : ''}`}
        onClick={() => handleRoleChange('student')}
      >
        <span className={styles.roleIcon}>🎓</span>
        <span className={styles.roleName}>Estudiante</span>
        <span className={styles.roleDesc}>Material didáctico, logros y seguimiento</span>
      </button>
      
      <button
        type="button"
        className={`${styles.roleOption} ${formData.role === 'teacher' ? styles.active : ''}`}
        onClick={() => handleRoleChange('teacher')}
      >
        <span className={styles.roleIcon}>📚</span>
        <span className={styles.roleName}>Docente</span>
        <span className={styles.roleDesc}>Gestionar estudiantes y contenido educativo</span>
      </button>
    </div>
  );

  // Renderizar campos específicos para estudiantes
  const renderStudentFields = () => (
    <div className={styles.roleSpecificFields}>
      <h3 className={styles.sectionTitle}>Información Académica</h3>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="studentGrade">Grado *</label>
          <select
            id="studentGrade"
            name="studentGrade"
            value={formData.studentGrade}
            onChange={handleInputChange}
            className={fieldErrors.studentGrade ? styles.error : ''}
          >
            <option value="">Selecciona tu grado</option>
            {GRADE_OPTIONS.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          {fieldErrors.studentGrade && (
            <span className={styles.errorMessage}>{fieldErrors.studentGrade}</span>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="studentClass">Clase *</label>
          <select
            id="studentClass"
            name="studentClass"
            value={formData.studentClass}
            onChange={handleInputChange}
            className={fieldErrors.studentClass ? styles.error : ''}
          >
            {CLASS_OPTIONS.map(cls => (
              <option key={cls} value={cls}>Clase {cls}</option>
            ))}
          </select>
          {fieldErrors.studentClass && (
            <span className={styles.errorMessage}>{fieldErrors.studentClass}</span>
          )}
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="studentTeacherId">Docente a cargo *</label>
        <select
          id="studentTeacherId"
          name="studentTeacherId"
          value={formData.studentTeacherId}
          onChange={handleInputChange}
          className={fieldErrors.studentTeacherId ? styles.error : ''}
        >
          <option value="">Selecciona tu docente</option>
          {MOCK_TEACHERS.map(teacher => (
            <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
          ))}
        </select>
        {fieldErrors.studentTeacherId && (
          <span className={styles.errorMessage}>{fieldErrors.studentTeacherId}</span>
        )}
      </div>
      
      <div className={styles.infoBox}>
        <p>📝 Tu registro necesitará aprobación de tu docente antes de que puedas acceder completamente a la plataforma.</p>
      </div>
    </div>
  );

  // Renderizar campos específicos para docentes
  const renderTeacherFields = () => (
    <div className={styles.roleSpecificFields}>
      <h3 className={styles.sectionTitle}>Información Profesional</h3>
      
      <div className={styles.formGroup}>
        <label>Materias que impartes *</label>
        <div className={styles.checkboxGrid}>
          {['Matemáticas', 'Ciencias', 'Lenguaje', 'Historia', 'Inglés', 'Arte'].map(subject => (
            <label key={subject} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.teacherSubjects?.includes(subject) || false}
                onChange={() => handleSubjectToggle(subject)}
              />
              {subject}
            </label>
          ))}
        </div>
        {fieldErrors.teacherSubjects && (
          <span className={styles.errorMessage}>{fieldErrors.teacherSubjects}</span>
        )}
      </div>
      
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Grados que atiendes *</label>
          <select
            multiple
            value={formData.teacherGrades}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions, opt => opt.value);
              setFormData(prev => ({ ...prev, teacherGrades: selected }));
            }}
            className={fieldErrors.teacherGrades ? styles.error : ''}
            size={4}
          >
            {GRADE_OPTIONS.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <small>Mantén Ctrl presionado para seleccionar múltiples</small>
          {fieldErrors.teacherGrades && (
            <span className={styles.errorMessage}>{fieldErrors.teacherGrades}</span>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label>Clases a cargo *</label>
          <div className={styles.checkboxGrid}>
            {CLASS_OPTIONS.map(cls => (
              <label key={cls} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.teacherClasses?.includes(cls) || false}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...(formData.teacherClasses || []), cls]
                      : (formData.teacherClasses || []).filter(c => c !== cls);
                    setFormData(prev => ({ ...prev, teacherClasses: updated }));
                  }}
                />
                Clase {cls}
              </label>
            ))}
          </div>
          {fieldErrors.teacherClasses && (
            <span className={styles.errorMessage}>{fieldErrors.teacherClasses}</span>
          )}
        </div>
      </div>
      
      <div className={styles.infoBox}>
        <p>👩‍🏫 Como docente podrás gestionar tus estudiantes, subir material y publicar en el blog.</p>
      </div>
    </div>
  );

  return (
    <PageLayout 
      showBreadcrumb={false}
      backgroundImage={backgroundImage}
      backgroundProps={{
        opacity: 0.9,
        overlay: true,
        overlayColor: "rgba(184, 234, 255, 0.1)",
        overlayOpacity: 0.1
      }}
    >
      <div className={styles.registerWrapper}>
        <div className={styles.registerContainer}>
          <Card className={styles.registerCard}>
            <div className={styles.registerHeader}>
              <h1 className={styles.registerTitle}>Crear cuenta</h1>
              <p className={styles.registerSubtitle}>
                Únete a Foco Educativo 360 y comienza tu viaje de aprendizaje
              </p>
            </div>
            
            {error && (
              <div className={styles.alertError}>
                <span className={styles.alertIcon}>⚠️</span>
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className={styles.alertSuccess}>
                <span className={styles.alertIcon}>✨</span>
                <p>{success}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className={styles.registerForm}>
              {/* Selector de Rol */}
              {renderRoleSelector()}
              
              {/* Paso 1: Información básica */}
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Paso 1: Información básica</h3>
                
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ej: María González"
                    className={fieldErrors.name ? styles.error : ''}
                  />
                  {fieldErrors.name && (
                    <span className={styles.errorMessage}>{fieldErrors.name}</span>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Correo electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@correo.com"
                    className={fieldErrors.email ? styles.error : ''}
                  />
                  {fieldErrors.email && (
                    <span className={styles.errorMessage}>{fieldErrors.email}</span>
                  )}
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="password">Contraseña *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={fieldErrors.password ? styles.error : ''}
                    />
                    {passwordStrength && (
                      <div className={`${styles.passwordStrength} ${styles[passwordStrength]}`}>
                        <span>Seguridad: {
                          passwordStrength === 'strong' ? 'Fuerte' :
                          passwordStrength === 'medium' ? 'Media' : 'Débil'
                        }</span>
                      </div>
                    )}
                    {fieldErrors.password && (
                      <span className={styles.errorMessage}>{fieldErrors.password}</span>
                    )}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirmar contraseña *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={fieldErrors.confirmPassword ? styles.error : ''}
                    />
                    {fieldErrors.confirmPassword && (
                      <span className={styles.errorMessage}>{fieldErrors.confirmPassword}</span>
                    )}
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Teléfono (opcional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+52 123 456 7890"
                    className={fieldErrors.phone ? styles.error : ''}
                  />
                  {fieldErrors.phone && (
                    <span className={styles.errorMessage}>{fieldErrors.phone}</span>
                  )}
                </div>
              </div>
              
              {/* Campos específicos según el rol */}
              {formData.role === 'student' && renderStudentFields()}
              {formData.role === 'teacher' && renderTeacherFields()}
              
              {/* Paso 2: Información adicional */}
              <div className={styles.formStep}>
                <h3 className={styles.stepTitle}>Paso 2: Información adicional</h3>
                
                <div className={styles.formGroup}>
                  <label htmlFor="bio">Sobre ti (opcional)</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Cuéntanos un poco sobre ti, tus intereses y motivaciones..."
                  />
                  <span className={styles.charCount}>{formData.bio?.length || 0}/500</span>
                </div>
              </div>
              
              {/* Términos y condiciones */}
              <div className={styles.termsSection}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>
                    Acepto los <Link to="/terminos">términos y condiciones</Link> y la{' '}
                    <Link to="/privacidad">política de privacidad</Link>
                  </span>
                </label>
                {fieldErrors.terms && (
                  <span className={styles.errorMessage}>{fieldErrors.terms}</span>
                )}
              </div>
              
              {/* Botones de acción */}
              <div className={styles.formActions}>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  fullWidth
                >
                  {loading ? 'Registrando...' : 'Crear cuenta'}
                </Button>
                
                <p className={styles.loginLink}>
                  ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
