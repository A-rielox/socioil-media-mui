import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';

import { LogoBig, InputSimple, Alert } from '../components';
import styled from 'styled-components';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
   animationTwo,
   animationInputRegistro,
   transition,
} from '../animations';
import Fondo2 from '../components/Fondo2.js';

const initialState = {
   name: '',
   email: '',
   password: '',
   isMember: true,
};

function Register() {
   const { isLoading, showAlert, displayAlert, registerUser, user, loginUser } =
      useAppContext();

   const navigate = useNavigate();
   const [values, setValues] = useState(initialState);

   // global context and useNavigate later

   const changeStateValues = e => {
      const name = e.target.name;
      const value = e.target.value;

      setValues({ ...values, [name]: value });
   };

   const onSubmit = e => {
      e.preventDefault();
      const { name, email, password, isMember } = values;

      if (!email || !password || (!isMember && !name)) {
         displayAlert();

         return;
      }

      const currentUser = { name, email, password };

      if (isMember) {
         loginUser(currentUser);
      } else {
         registerUser(currentUser);
      }
   };

   useEffect(() => {
      if (user) {
         setTimeout(() => {
            navigate('/');
         }, 3000);
      }
   }, [user, navigate]);

   const toggleMember = () => {
      setValues({ ...values, isMember: !values.isMember });
   };

   return (
      <motion.div
         variants={animationTwo}
         initial="out"
         animate="in"
         exit="out"
         transition={transition}
      >
         <Wrapper className="full-page">
            <div className="main-img">
               <Fondo2 className="img" />
            </div>

            <LayoutGroup>
               <motion.form
                  layout
                  initial={{ height: 'auto' }}
                  animate={{ height: 'auto' }}
                  transition={{
                     // duration: '0.4',
                     ease: 'easeIn',
                  }}
                  className="form"
                  onSubmit={onSubmit}
               >
                  <motion.div layout>
                     <LogoBig />
                  </motion.div>

                  {!values.isMember ? (
                     <motion.h3 layout>Registro</motion.h3>
                  ) : (
                     <motion.h3 layout>Login</motion.h3>
                  )}

                  {showAlert && (
                     <Alert
                        alertType="danger"
                        alertText="favor introducir todos los datos"
                     />
                  )}

                  {/* NOMBRE */}
                  <AnimatePresence>
                     {!values.isMember && (
                        <motion.div
                           layout
                           variants={animationInputRegistro}
                           initial="out"
                           animate="in"
                           exit="out"
                           transition={transition}
                        >
                           <InputSimple
                              type="text"
                              name="name"
                              value={values.name}
                              changeStateValues={changeStateValues}
                              labelText="Nombre"
                           />
                        </motion.div>
                     )}
                  </AnimatePresence>

                  {/* EMAIL */}
                  <motion.div layout>
                     <InputSimple
                        type="email"
                        name="email"
                        value={values.email}
                        changeStateValues={changeStateValues}
                     />
                  </motion.div>

                  {/* PASSWORD */}
                  <motion.div layout>
                     <InputSimple
                        type="password"
                        name="password"
                        value={values.password}
                        changeStateValues={changeStateValues}
                     />
                  </motion.div>

                  <motion.div layout>
                     <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1.05 }}
                        transition={{
                           type: 'spring',
                           stiffness: 150,
                           ease: 'easeInOut',
                        }}
                     >
                        <button
                           type="submit"
                           className="btn btn-block"
                           disabled={isLoading}
                        >
                           enviar
                        </button>
                     </motion.div>

                     <p>
                        {values.isMember
                           ? 'Aún no te unes? '
                           : 'Ya eres miembro?'}

                        <button
                           type="button"
                           onClick={toggleMember}
                           className="member-btn"
                        >
                           {values.isMember ? 'Registro' : 'Login'}
                        </button>
                     </p>
                  </motion.div>
               </motion.form>
            </LayoutGroup>
         </Wrapper>
      </motion.div>
   );
}

export default Register;

const Wrapper = styled.section`
   display: grid;
   align-items: center;
   max-height: 100vh;

   background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
   );

   .form {
      max-width: 400px;
      /* border-top: 5px solid var(--primary-500); */

      background: linear-gradient(
         rgba(255, 255, 255, 0.7),
         rgba(255, 255, 255, 0.7)
      );
   }

   .logo {
      width: 80%;
      display: block;
      margin: 0 auto;
      margin-bottom: 1.38rem;
   }
   /* .form {
      max-width: 400px;
      border-top: 5px solid var(--primary-500);
   } */

   h3 {
      text-align: center;
   }
   p {
      margin: 0;
      margin-top: 1rem;
      text-align: center;
   }
   .btn {
      margin-top: 1rem;
   }
   .member-btn {
      background: transparent;
      border: transparent;
      color: var(--primary-500);
      cursor: pointer;
      letter-spacing: var(--letterSpacing);
   }

   /* .main-img {
      display: block;
      width: 100%;
      position: absolute;
      z-index: -1;
   } */

   .main-img {
      /* display: block;
      width: 100%;
      max-height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      z-index: -1;
      overflow: hidden; */

      width: 100%;
      height: 100%;
      position: absolute;

      object-fit: cover;
      z-index: -1;
      overflow: hidden;

      display: grid;
      justify-content: center;
      align-content: center;

      svg {
         height: 100vh !important;
         width: auto !important;
      }
   }
`;
