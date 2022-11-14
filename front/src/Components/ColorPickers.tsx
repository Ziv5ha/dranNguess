import React from 'react';

export default function ColorPickers({
  setBrushColor,
}: {
  setBrushColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className='color-pickers'>
      {/* red => yellow */}
      <button
        onClick={() => {
          setBrushColor('#ff1a00');
        }}
        style={{ color: '#ff1a00' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#ff6600');
        }}
        style={{ color: '#ff6600' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#fdf122');
        }}
        style={{ color: '#fdf122' }}
      >
        ■
      </button>
      {/* green */}
      <button
        onClick={() => {
          setBrushColor('#0c7d40');
        }}
        style={{ color: '#0c7d40' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#17bd30');
        }}
        style={{ color: '#17bd30' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#4CBB17');
        }}
        style={{ color: '#4CBB17' }}
      >
        ■
      </button>

      {/* purple */}
      <button
        onClick={() => {
          setBrushColor('#68329b');
        }}
        style={{ color: '#68329b' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#da1ae8');
        }}
        style={{ color: '#da1ae8' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#FE8AB1');
        }}
        style={{ color: '#FE8AB1' }}
      >
        ■
      </button>

      {/* blue */}
      <button
        onClick={() => {
          setBrushColor('#150ee8');
        }}
        style={{ color: '#150ee8' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#2561F7');
        }}
        style={{ color: '#2561F7' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#0eaee8');
        }}
        style={{ color: '#0eaee8' }}
      >
        ■
      </button>

      {/* brown */}
      <button
        onClick={() => {
          setBrushColor('#D7C297');
        }}
        style={{ color: '#D7C297' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#b0894f');
        }}
        style={{ color: '#b0894f' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#79553D');
        }}
        style={{ color: '#79553D' }}
      >
        ■
      </button>
      {/* black => white */}
      <button
        onClick={() => {
          setBrushColor('#000000');
        }}
        style={{ color: '#000000' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#A0A5A8');
        }}
        style={{ color: '#A0A5A8' }}
      >
        ■
      </button>
      <button
        onClick={() => {
          setBrushColor('#f0f0f0');
        }}
        style={{ color: '#f0f0f0' }}
      >
        ■
      </button>
    </div>
  );
}
