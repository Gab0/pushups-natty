import React from 'react';
import ExerciseComponent from '../components/ExerciseComponent';
import Image from 'next/image';
// import FirstBkgImage from '../../public/images/fristbkg.png'; // Importar a imagem

function Index(): React.JSX.Element {
  return (
    <div className='bg-image'>
      <h1>Exercise Program</h1>
      <ExerciseComponent />
    </div>
  );
}

export default Index;
