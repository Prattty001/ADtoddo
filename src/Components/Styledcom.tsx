// src/Components/TodoApp.styles.ts
import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #5bc0de, #5bc0de);
  height: 100vh;
  padding: 20px;
`;

export const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const TodoInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

export const AddButton = styled.button`
  background-color: #5bc0de;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
`;

export const FilterDropdown = styled.select`
  margin-left: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

export const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const TodoItem = styled.li`
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 400px;
`;

export const TodoText = styled.span<{ completed: boolean }>`
  flex-grow: 1;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

export const EditInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

export const SaveButton = styled.button`
  background-color: #5bc0de;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-right: 5px;
`;

export const EditButton = styled.button`
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-right: 5px;
`;

export const CompleteButton = styled.button`
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-right: 5px;
`;

export const DeleteButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
`;
