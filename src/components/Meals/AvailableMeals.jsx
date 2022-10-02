import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import useHttp from '../../hooks/use-http';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error: httpError, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealObj) => {
      const loadedMeals = [];

      for (const key in mealObj) {
        loadedMeals.push({
          id: key,
          name: mealObj[key].name,
          description: mealObj[key].description,
          price: mealObj[key].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals({
      url: 'https://react-vite-complete-api-http-default-rtdb.firebaseio.com/meals.json',
    },transformMeals);
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>;
      </section>
    );
  } 
  
  if (httpError) { 
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>;
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
