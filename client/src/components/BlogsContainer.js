import { useEffect, useState } from 'react';
import { useAppContext } from '../context/appContext';
import Loading from './Loading';
import PageBtnContainerBlogs from './PageBtnContainerBlogs';
import Blog from './Blog';
import styled from 'styled-components';

import { AnimatePresence } from 'framer-motion';
import ModalBlog from './modal/ModalBlog';
import DisplayedBlog from './modal/DisplayedBlog';

const BlogsContainer = () => {
   const {
      getBlogs,
      blogs,
      isLoading,
      pageBlogs,
      totalBlogs,

      searchBlog,
      searchCategory,
      sort,
      numOfBlogPages,
   } = useAppContext();

   // ♏♏♏♏
   const [modalOpen, setModalOpen] = useState(false);
   const [blogOpened, setBlogOpened] = useState('');
   const close = () => setModalOpen(false);
   const open = blogId => {
      setModalOpen(true);

      const blogSelected = blogs.filter(blog => blog._id === blogId);
      console.log(blogSelected);

      setBlogOpened(blogSelected[0]);
   };

   useEffect(() => {
      getBlogs();
   }, [searchBlog, searchCategory, sort, pageBlogs]);

   if (isLoading) {
      return <Loading center />;
   }

   if (blogs.length === 0) {
      return (
         <Wrapper>
            <h2>No encontramos blogs 😳 ...</h2>
         </Wrapper>
      );
   }

   return (
      <Wrapper>
         <h5>
            {totalBlogs} blog{blogs.length > 1 && 's'} encontrado
            {blogs.length > 1 && 's'}
         </h5>

         <div className="recipes">
            {blogs.map(blog => {
               return <Blog key={blog._id} {...blog} openModal={open} />;
            })}
         </div>

         {numOfBlogPages > 1 && <PageBtnContainerBlogs />}

         {/* ♏♏♏♏                      👇 */}
         <AnimatePresence>
            {modalOpen && blogOpened && (
               // <ModalBlog
               //    modalOpen={modalOpen}
               //    handleClose={close}
               //    blogOpened={blogOpened}
               // />
               <>
                  <DisplayedBlog
                     {...blogOpened}
                     modalOpen={modalOpen}
                     handleClose={close}
                     blogOpened={blogOpened}
                  />
                  <button onClick={close}>Close</button>
               </>
            )}
         </AnimatePresence>
      </Wrapper>
   );
};

export default BlogsContainer;

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
   @media (min-width: 992px) {
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

   /* .modal { */
   /* width: clamp(80%, 900px, 90%); */
   /* height: min(50%, 90%); */

   /* margin: auto; */
   /* padding: 0 2rem; */
   /* border-radius: 12px; */
   /* display: flex;
      flex-direction: column;
      align-items: center; */

   /* article {
         position: relative;
         -webkit-box-shadow: 9px 9px 22px 13px rgba(0, 0, 0, 0.43);
         box-shadow: 9px 9px 22px 13px rgba(0, 0, 0, 0.43);
      }
   } */
`;
