import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/board.css'; 
import CardForm from './CardForm'; 
import { getSections, updateSections } from '../data';



function Board() {

// Add a new card to a section
const addCard = (title, info, sectionId) => {
    // Copy the sections array to avoid mutating state directly
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          cards: [...section.cards, { id: Date.now(), title, info }]
        };
      }
      return section;
    });
    // Update state with the modified sections
    setSections(updatedSections);
    // Update sections data
    updateSections(updatedSections);
  };

 
}
  export default Board;