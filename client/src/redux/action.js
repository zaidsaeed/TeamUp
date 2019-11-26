// types of action
const Types = {
  ADD_USER: "ADD_USER"
  // DELETE_ITEM: "DELETE_ITEM"
};
// actions
const addUser = user => ({
  type: Types.ADD_USER,
  payload: user
});

// const deleteItem = id => ({
//   type: Types.DELETE_ITEM,
//   payload: id
// });

export default {
  addUser,
  // deleteItem,
  Types
};
