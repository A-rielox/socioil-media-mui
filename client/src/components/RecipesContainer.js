import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import { useEffect, useState } from 'react';
import PageBtnContainer from './PageBtnContainer';
import Recipe from './Recipe';
import styled from 'styled-components';

import { AnimatePresence } from 'framer-motion';
import Modal from './modal/Modal';

const RecipesContainer = () => {
   // prettier-ignore
   const {
      getRecipes, recipes, isLoading, page, totalRecipes, search, searchOil,
      searchProblem, sort, numOfPages } = useAppContext();

   // ♏♏♏♏
   const [modalOpen, setModalOpen] = useState(false);
   const [recipeOpened, setRecipeOpened] = useState('');
   const close = () => setModalOpen(false);
   const open = recipeId => {
      setModalOpen(true);

      const recipeSelected = recipes.filter(recipe => recipe._id === recipeId);

      setRecipeOpened(recipeSelected[0]);
   };

   useEffect(() => {
      getRecipes();
   }, [search, searchOil, searchProblem, sort, page]);

   if (isLoading) {
      return <Loading center />;
   }

   if (recipes.length === 0) {
      return (
         <Wrapper>
            <h2>No encontramos recetitas 😳 ...</h2>
         </Wrapper>
      );
   }

   return (
      <Wrapper>
         <h5>
            {totalRecipes} receta{recipes.length > 1 && 's'} encontrada
            {recipes.length > 1 && 's'}
         </h5>

         <div className="recipes">
            {recipes.map(recipe => {
               return <Recipe key={recipe._id} {...recipe} openModal={open} />;
            })}
         </div>

         {numOfPages > 1 && <PageBtnContainer />}

         {/* ♏♏♏♏                      👇 */}
         <AnimatePresence>
            {modalOpen && recipeOpened && (
               <Modal
                  modalOpen={modalOpen}
                  handleClose={close}
                  recipeOpened={recipeOpened}
               />
            )}
         </AnimatePresence>
      </Wrapper>
   );
};

export default RecipesContainer;

const Wrapper = styled.section`
   margin-top: 4rem;
   h2 {
      text-transform: none;
   }
   & > h5 {
      font-weight: 700;
   }
   .recipes {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: 2rem;
   }
   /* @media (min-width: 992px) {
      .recipes {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 1rem;
      }
   } */
   @media (min-width: 1200px) {
      .recipes {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 1rem;
      }
   }

   .backdrop {
      position: fixed;
      /* position: absolute; */
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      background: #0000008a;
      display: flex;
      align-items: center;
      justify-content: center;

      z-index: 100;
   }

   .modal {
      width: clamp(50%, 700px, 90%);
      height: min(50%, 300px);

      margin: auto;
      /* padding: 0 2rem; */
      /* border-radius: 12px; */
      display: flex;
      flex-direction: column;
      align-items: center;

      article {
         position: relative;
         -webkit-box-shadow: 9px 9px 22px 13px rgba(0, 0, 0, 0.43);
         box-shadow: 9px 9px 22px 13px rgba(0, 0, 0, 0.43);
      }
   }
`;
