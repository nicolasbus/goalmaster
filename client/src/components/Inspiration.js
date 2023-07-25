import React from 'react';

const Inspiration = () => {
  const resources = [
    'Consejo 1: Establece metas realistas y alcanzables.',
    'Consejo 2: Celebra tus pequeños logros en el camino hacia tus metas más grandes.',
    'Consejo 3: Mantén una actitud positiva y persevera incluso en los momentos difíciles.',
    'Cita inspiradora: "El éxito es la suma de pequeños esfuerzos repetidos día tras día." - Robert Collier',
  ];

  return (
    <div>
      <h2>Inspiración y Recursos</h2>
      <ul>
        {resources.map((resource, index) => (
          <li key={index}>{resource}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inspiration;
