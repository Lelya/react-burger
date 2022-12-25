import React from 'react';
import styles from '../pages.module.css';

export default function Error404() {
  return (
      <div className={`${styles.ingredient_wrapper} mt-10`}>
          <p className="text text_type_main-large">Ошибка 404</p>
          <p className="text text_type_main-large">Страница не найдена</p>
      </div>
  );
}
