import { useEffect, useState } from 'react';
import Loading from '../Loading';

import { FaCalendarAlt } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import RecipeInfo from '../RecipeInfo';
import styled from 'styled-components';

import { motion } from 'framer-motion';
import Backdrop from './Backdrop';

const dropIn = {
   hidden: {
      y: '-100vh',
      opacity: 0,
   },
   visible: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 0.2,
         type: 'spring',
         damping: 25,
         stiffness: 500,
      },
   },
   exit: { x: '-100vw', opacity: 0 },
};

const DisplayedBlog = ({
   _id,
   title,
   desc,
   category,
   createdAt,
   createdBy,
   /* openModal, */
   handleClose,
}) => {
   const { setEditBlog, deleteBlog, user, authFetch } = useAppContext();
   const [blogUser, setBlogUser] = useState(null);

   useEffect(() => {
      const fetchUser = async () => {
         const {
            data: { queryUser },
         } = await authFetch.get(`/auth/getUser?userId=${createdBy}`);

         setBlogUser(queryUser);
      };

      fetchUser();
   }, [_id]);

   if (!blogUser) {
      return <Loading center />;
   }

   // arreglo para class del color del nivel
   let colorLevel = blogUser.level.split(' ');
   colorLevel = colorLevel[colorLevel.length - 1];

   // arreglo del string del nivel
   const newStr = blogUser.level.split(' ');
   let levelToDisplay = [];
   for (let i = 0; i < 3; i++) {
      if (i === 0) {
         levelToDisplay.push(newStr[i]);
      } else if (i === 1) {
         if (newStr[i]) {
            levelToDisplay.push(` ${newStr[i][0]}.`);
         }
      } else if (i === 2) {
         if (newStr[i]) {
            levelToDisplay.push(` ${newStr[i][0]}.`);
         }
      }
   }
   levelToDisplay = levelToDisplay.join('');

   // arreglo para nombre a desplegar red red pendiente cortar a 1er nombre red red

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   return (
      <Backdrop onClick={handleClose}>
         <motion.div
            onClick={e => e.stopPropagation()}
            // className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
         >
            <Wrapper /* onClick={() => openModal(_id)} */>
               <header>
                  <div className="info">
                     <h5>{title}</h5>

                     <ul className="ulListProblem">
                        <li># {category}</li>
                     </ul>
                  </div>
               </header>

               <div className="content">
                  <div
                     className="content-center"
                     dangerouslySetInnerHTML={{ __html: desc }}
                  ></div>

                  <footer>
                     <div className="actions">
                        {user._id === createdBy ? (
                           <Link
                              to="/add-blog"
                              onClick={() => setEditBlog(_id)}
                              className="btn edit-btn"
                           >
                              editar
                           </Link>
                        ) : (
                           <button type="button" className={`btn btn-user`}>
                              {blogUser.name}
                           </button>
                        )}
                        {user._id === createdBy ? (
                           <button
                              type="button"
                              className="btn delete-btn"
                              onClick={() => deleteBlog(_id)}
                           >
                              borrar
                           </button>
                        ) : (
                           <button
                              type="button"
                              className={`btn status ${colorLevel}`}
                           >
                              {levelToDisplay}
                           </button>
                        )}
                     </div>

                     <RecipeInfo icon={<FaCalendarAlt />} text={date} />
                  </footer>
               </div>

               <button
                  type="button"
                  className={`btn btn-close`}
                  onClick={handleClose}
               >
                  <ImCross />
               </button>
            </Wrapper>
         </motion.div>
      </Backdrop>
   );
};

export default DisplayedBlog;

const Wrapper = styled.article`
   background: var(--white);
   border-radius: var(--borderRadius);
   display: grid;
   grid-template-rows: 100px auto;
   box-shadow: var(--shadow-2);

   position: relative; // pal btn close

   max-height: 90vh;
   overflow-y: scroll;

   .content {
      padding: 1rem 1.5rem;
      display: grid;
      grid-template-rows: 1fr auto;
   }
   .content-center {
      border-bottom: 1px solid var(--grey-100);

      p {
         margin-bottom: 0.5rem;
         max-width: 40em;
         color: #6e7785;
      }

      ul {
         list-style-type: disc;
         margin-top: 0;
         padding-top: 0;
         padding-bottom: 0.5rem;
         padding-left: 2rem;
      }
   }

   .content-center > p > img {
      max-width: 100% !important;
      height: auto !important;
   }

   @media (min-width: 700px) {
      padding: 1rem;
   }

   @media (min-width: 992px) {
      padding: 2rem;
   }

   header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--grey-100);
      display: grid;
      align-items: center;
      height: 100px;
      h5 {
         letter-spacing: 0;
      }
   }

   .info {
      h5 {
         margin-bottom: 0.25rem;
      }
   }
   .ulListProblem {
      margin: 0 20px;
      display: flex;
      justify-content: space-between;
      text-transform: capitalize;

      li {
         list-style-type: none;
         margin-top: 0.5rem;
         display: flex;
         align-items: center;
      }
   }

   /* 
   distribuidor silver
   star		#b500ff
   senior star	#c900c9
   executive	#d70000
   silver		#a10000
   gold		#f3ff00
   platinum	#00f900
   diamond		#058210
   crown diamond	#3f15d0
   r.c. diamond	#6500a3
   */

   .distribuidor {
      background: rgba(191, 191, 191, 0.3);
      color: var(--textColor);
   }

   .estrella {
      background: rgba(181, 0, 255, 0.3);
      color: var(--textColor);
   }
   .mayor {
      background: rgba(201, 0, 201, 0.3);
      color: var(--textColor);
   }
   .ejecutivo {
      color: var(--textColor);
      background: rgba(215, 0, 0, 0.3);
   }
   .plata {
      color: var(--textColor);
      background: rgba(161, 0, 0, 0.3);
   }
   .oro {
      color: var(--textColor);
      background: rgba(243, 255, 0, 0.3);
   }
   .platino {
      color: var(--textColor);
      background: rgba(0, 249, 0, 0.3);
   }
   .diamante {
      color: var(--textColor);
      background: rgba(5, 130, 16, 0.3);
   }
   .corona {
      color: var(--textColor);
      background: rgba(63, 21, 208, 0.3);
   }
   .real {
      color: var(--textColor);
      background: rgba(101, 0, 163, 0.3);
   }

   .status {
      border-radius: var(--borderRadius);
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      text-align: center;
      width: auto;
      height: 30px;
      font-size: 0.8rem;

      margin-left: 0.5rem;
   }

   .actions {
      .btn-user {
         font-size: 0.8rem;
         /* margin-left: 0.5rem; */
         font-weight: bold;
      }
   }

   footer {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
   .edit-btn,
   .delete-btn {
      letter-spacing: var(--letterSpacing);
      cursor: pointer;
      height: 30px;
      font-size: 0.8rem;
   }
   .edit-btn {
      color: var(--green-dark);
      background: var(--green-light);
      margin-right: 0.5rem;
   }
   .delete-btn {
      color: var(--red-dark);
      background: var(--red-light);
   }
   &:hover .actions {
      visibility: visible;
   }

   .btn-close {
      position: absolute;
      top: 20px;
      right: 20px;

      background-color: var(--red-light);

      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;

      &:hover {
         background-color: var(--white);
         color: var(--red-light);
         border: 3px solid var(--red-light);
      }
   }
`;
