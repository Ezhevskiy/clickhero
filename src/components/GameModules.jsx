import React from 'react';

export const HeroStats = ({ hero }) => (
  <div className="card">
    <h3 style={{color: '#00ccff'}}>ГЕРОЙ</h3>
    <p>❤️ Здоровье: <span style={{color: '#ff4444'}}>{hero.heroHp}</span></p>
    <p>⚡ Энергия: {hero.energy} / 10</p>
    
    <div className="money-display">
      💰 СИЛА: {hero.strength}
    </div>
    
    <p>⚔️ Урон за клик: {hero.powerPerClick}</p>
    <progress value={hero.strength} max="30" style={{width: '100%'}}></progress>
    <br/><small>Цель: 30 силы</small>
  </div>
);

export const EnemyStats = ({ enemy, count }) => (
  <div className="card">
    <h3 style={{color: '#ff4444'}}>ВРАГИ ({count})</h3>
    {count > 0 ? (
      <div>
        <p>Имя: {enemy.name}</p>
        <p>❤️ HP Врага: <span style={{color: '#ff4444'}}>{enemy.enemyHp}</span></p>
        <div style={{width: '100%', background: '#333', height: '10px'}}>
          <div style={{
            width: `${(enemy.enemyHp / enemy.maxHp) * 100}%`, 
            background: '#ff4444', height: '100%'
          }}></div>
        </div>
      </div>
    ) : <p>Все враги повержены!</p>}
  </div>
);

export const Controls = ({ onAttack, onRest, canAttack, isGameOver }) => (
  <div className="controls">
    <button className="btn-action btn-attack" onClick={onAttack} disabled={isGameOver || !canAttack}>
      АТАКОВАТЬ
    </button>
    <button className="btn-action btn-rest" onClick={onRest} disabled={isGameOver}>
      ОТДОХНУТЬ
    </button>
  </div>
);

export const Shop = ({ strength, onBuy, isGameOver }) => {
  const items = [
    { id: 1, name: 'Меч', cost: 10, bonus: 1, icon: '⚔️' },
    { id: 2, name: 'Топор', cost: 25, bonus: 3, icon: '🪓' },
    { id: 3, name: 'Артефакт', cost: 50, bonus: 5, icon: '🔮' }
  ];

  return (
    <div className="shop-container">
      {items.map(item => (
        <div key={item.id} className="shop-item" style={{opacity: strength >= item.cost ? 1 : 0.5}}>
          <div style={{fontSize: '2rem'}}>{item.icon}</div>
          <div style={{fontWeight: 'bold'}}>{item.name}</div>
          <div style={{color: '#ffd700'}}>💰 {item.cost}</div>
          <button 
            disabled={isGameOver || strength < item.cost}
            onClick={() => onBuy(item.cost, item.bonus)}
          >
            Купить
          </button>
        </div>
      ))}
    </div>
  );
};