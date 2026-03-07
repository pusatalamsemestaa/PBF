import React from 'react';
import { useRouter } from 'next/router';

const CategoryPage = () => {
const { query } = useRouter();

  return (
    <div>
      <h1>Category Parameters</h1>
      <p>nama kategori : {`${query.slug && query.slug[0]}`}</p>
      <p> brand : {`${query.slug && query.slug[1]}`}</p>
    </div>
  );
};

export default CategoryPage;

