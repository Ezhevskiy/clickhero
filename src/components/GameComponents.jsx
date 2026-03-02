import React from 'react';

const styles = {
  card: {
    border: '2px solid #555',
    padding: '20px',
    borderRadius: '12px',
    background: 'linear-gradient(180deg, #121212 0%, #1e1e1e 100%)',
    width: '45%',
    boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
    minHeight: '220px',
  },
  title: { textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' },
  label: { color: '#ffffff', fontSize: '1rem', margin: '4px 0' },
  statValue: { fontWeight: 'bold' },
  enemyRow: {
    padding: '8px',
    borderBottom: '1px solid #333',
    marginBottom: '5px',
    backgroundColor: '#1a1a1a'
  }
};

export const HeroStats = ({ hero, level }) => (
  <div style={styles.card}>
    <h3 style={{...styles.title, color: '#60afff'}}>🛡️ ГЕРОЙ [Lvl {level}]</h3>
    <p style={styles.label}>❤️ HP: <span style={{...styles.statValue, color: '#00ff88'}}>{hero.hp} / {hero.maxHp}</span></p>
    <p style={styles.label}>🎯 Крит: {hero.critChance}% | ⚔️ Урон: {hero.powerPerClick}</p>
    <p style={styles.label}>💪 Опыт: {hero.strength}</p>
  </div>
);

export const EnemyGroup = ({ enemies }) => (
  <div style={styles.card}>
    <h3 style={{...styles.title, color: '#ff5c5c'}}>👹 ОТРЯД ВРАГОВ</h3>
    <div style={{maxHeight: '200px', overflowY: 'auto'}}>
      {enemies.map((en, idx) => (
        <div key={en.id} style={styles.enemyRow}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}>
            <span>{idx === 0 ? '➡️' : ''} {en.name}</span>
            <span style={{color: '#ff3333'}}>HP: {Math.max(0, en.hp)}</span>
          </div>
          <div style={{width: '100%', background: '#333', height: '4px', marginTop: '4px'}}>
            <div style={{
              width: `${(en.hp / en.maxHp) * 100}%`, 
              background: '#ff3333', height: '100%', transition: 'width 0.2s'
            }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const Shop = ({ strength, level, onBuy, isGameOver }) => {
  const baseItems = [
    { id: 1, name: 'Меч', cost: 10, bonus: 2, icon: '⚔️' },
    { id: 2, name: 'Доспех', cost: 20, hpBonus: 10, icon: '🛡️' },
    { id: 3, name: 'Артефакт', cost: 50, bonus: 5, icon: '🔮' }
  ];

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {baseItems.map(item => {
          const cost = item.cost * level;
          const canAfford = strength >= cost;
          return (
            <button 
              key={item.id}
              disabled={isGameOver || !canAfford}
              onClick={() => onBuy(cost, item.bonus || 0, item.hpBonus || 0)}
              style={{
                padding: '10px', background: canAfford ? '#333' : '#111', 
                color: canAfford ? '#ffd700' : '#666', border: '1px solid #444', cursor: 'pointer'
              }}
            >
              {item.icon} {item.name} ({cost})
            </button>
          );
        })}
      </div>
    </div>
  );
};