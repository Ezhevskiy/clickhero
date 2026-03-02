import React, { useState, useEffect } from 'react';
import './App.css';
import { HeroStats, EnemyStats, Controls, Shop } from './components/GameModules';

export default function App() {
  const [hero, setHero] = useState({ strength: 0, energy: 10, powerPerClick: 1, heroHp: 50 });
  const [enemies, setEnemies] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState("Нажмите 'Атаковать', чтобы начать бой!");
  const [isInitialized, setIsInitialized] = useState(false); // Флаг для предотвращения мгновенной победы

  // Создаем отряд из 3-х врагов при старте
  useEffect(() => {
    const list = [
      { id: 1, name: "Злобный Гоблин", enemyHp: 10, maxHp: 10, damage: 1 },
      { id: 2, name: "Каменный Орк", enemyHp: 20, maxHp: 20, damage: 1 },
      { id: 3, name: "Теневой Рыцарь", enemyHp: 30, maxHp: 30, damage: 2 }
    ];
    setEnemies(list);
    setIsInitialized(true); // Теперь мы знаем, что враги созданы
  }, []);

  const handleAttack = () => {
    if (isGameOver || hero.energy <= 0 || enemies.length === 0) return;

    const currentEnemy = { ...enemies[0] };
    currentEnemy.enemyHp -= hero.powerPerClick;

    let updatedEnemies = [...enemies];
    let newHeroHp = hero.heroHp;
    const newStrength = hero.strength + hero.powerPerClick;

    if (currentEnemy.enemyHp <= 0) {
      updatedEnemies.shift(); // Враг убит
      setMessage(`Вы победили ${currentEnemy.name}!`);
    } else {
      updatedEnemies[0] = currentEnemy;
      newHeroHp -= currentEnemy.damage; // Ответный урон
      setMessage(`Урон нанесен: ${hero.powerPerClick}. Получен урон: ${currentEnemy.damage}`);
    }

    setEnemies(updatedEnemies);
    setHero(prev => ({
      ...prev,
      strength: newStrength,
      energy: prev.energy - 1,
      heroHp: Math.max(0, newHeroHp)
    }));
  };

  const handleRest = () => {
    if (isGameOver) return;
    setHero(prev => ({ ...prev, energy: 10 }));
    setMessage("Вы отдохнули. Энергия восстановлена до 10.");
  };

  const handleBuy = (cost, bonus) => {
    if (hero.strength >= cost) {
      setHero(prev => ({
        ...prev,
        strength: prev.strength - cost,
        powerPerClick: prev.powerPerClick + bonus
      }));
      setMessage("Улучшение куплено!");
    }
  };

  // Проверка условий окончания игры
  useEffect(() => {
    if (!isInitialized) return; // Не проверяем, пока враги не заспавнились

    if (hero.heroHp <= 0) {
      setIsGameOver(true);
      setMessage("Герой погиб...");
    } else if (hero.strength >= 30) {
      setIsGameOver(true);
      setMessage("Победа! Вы достигли силы 30!");
    } else if (enemies.length === 0) {
      setIsGameOver(true);
      setMessage("Победа! Все враги повержены!");
    }
  }, [hero.heroHp, hero.strength, enemies.length, isInitialized]);

  return (
    <div className="game-container">
      <h1 className="game-title">CLICK HERO</h1>
      
      <div className="message-box">{message}</div>

      <div className="stats-wrapper">
        <HeroStats hero={hero} />
        <EnemyStats enemy={enemies[0] || {}} count={enemies.length} />
      </div>

      <Controls 
        onAttack={handleAttack} 
        onRest={handleRest} 
        canAttack={hero.energy > 0} 
        isGameOver={isGameOver} 
      />

      <Shop strength={hero.strength} onBuy={handleBuy} isGameOver={isGameOver} />

      {isGameOver && (
        <button className="restart-btn" onClick={() => window.location.reload()}>
          НАЧАТЬ ЗАНОВО
        </button>
      )}
    </div>
  );
}