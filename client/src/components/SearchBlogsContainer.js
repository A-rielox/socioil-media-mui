import { useAppContext } from '../context/appContext';
import { InputSimple, InputSelect } from '.';
import styled from 'styled-components';

const SearchContainer = () => {
   const {
      isLoading,
      categoryOptions,
      searchCategory,
      searchBlog,
      sort,
      sortOptions,
      changeStateValues,
      clearFilters,
   } = useAppContext();

   // SOLO CAMBIO LOS VALORES EN EL STATE, SE TIENEN Q BUSCAR EN EL BLOGSCONTAINER CON UN USEEFFECT CADA Q CAMBIE UNO DE ESTOS VALORES, VER RECIPESCONTAINER

   const handleSearch = e => {
      if (isLoading) return;
      const name = e.target.name;
      const value = e.target.value;
      // la fcn q cambia dinámicamente los valores en el state
      changeStateValues({ name, value });
   };

   const handleSubmit = e => {
      e.preventDefault();
      clearFilters();
   };

   return (
      <Wrapper>
         <form className="form">
            <h4>Búsqueda</h4>

            {/* search position */}
            <div className="form-center">
               <InputSimple
                  labelText="en el titulo"
                  type="text"
                  name="searchBlog"
                  value={searchBlog}
                  changeStateValues={handleSearch}
               ></InputSimple>

               {/* search by oil */}
               <InputSelect
                  labelText="categoria"
                  name="searchCategory"
                  value={searchCategory}
                  changeStateValues={handleSearch}
                  list={['todas', ...categoryOptions]}
               ></InputSelect>

               {/* sort */}
               <InputSelect
                  labelText="orden"
                  name="sort"
                  value={sort}
                  changeStateValues={handleSearch}
                  list={sortOptions}
               ></InputSelect>

               <button
                  className="btn btn-block btn-danger"
                  disabled={isLoading}
                  onClick={handleSubmit}
               >
                  limpiar filtros
               </button>
            </div>
         </form>
      </Wrapper>
   );
};

export default SearchContainer;

const Wrapper = styled.section`
   .form {
      width: 100%;
      max-width: 100%;
      box-shadow: var(--shadow-2);

      /* del gral */
      margin: 0 auto;
      padding-top: 1rem;
   }
   .form-input,
   .form-select,
   .btn-block {
      height: 35px;
   }
   .form-row {
      margin-bottom: 0;
   }
   .form-center {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 2rem;
      row-gap: 0.5rem;
   }
   h5 {
      font-weight: 700;
   }
   .btn-block {
      align-self: end;
      margin-top: 1rem;
   }
   @media (min-width: 768px) {
      .form-center {
         grid-template-columns: 1fr 1fr;
      }
   }
   @media (min-width: 992px) {
      .form-center {
         grid-template-columns: 1fr 1fr 1fr;
      }
      .btn-block {
         margin-top: 0;
      }
   }
`;
