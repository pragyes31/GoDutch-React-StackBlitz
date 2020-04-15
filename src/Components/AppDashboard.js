import React from "react";
import Modal from "react-modal";

function Header({title}) {
  return (
    <div class="header">
      <header className="main-title">{title}</header>
    </div>
  );
}


function AddNewBtns({ toggleModal }) {
  return (
    <div className="add-data">
      <div className="add-friend">
        <button
          onClick={() => toggleModal("friend")}
          className="add-friend-btn add-new-btn"
        >
          Add new Friend
        </button>
      </div>
      <div className="add-expense">
        <button
          className="add-expense-btn add-new-btn"
          onClick={() => toggleModal("expense")}
        >
          Add new Expense
        </button>
      </div>
    </div>
  );
}

function AddFriendModal({ toggleModal, addFriend }) {
  return (
    <Modal
      isOpen={true}
      contentLabel="Add New Friend"
      ariaHideApp={false}
      className="add-friend-modal modal-window"
    >
      <header className="modal-header add-friend-header">Add new Friend</header>
      <form className="add-friend-form" onSubmit={() => addFriend()}>
        <div className="friend-name-input">
          <label htmlFor="friend-name">Name:</label>
          <input id="friend-name" type="text" required />
        </div>
        <button type="button" className="friend-btn modal-btn">
          Add Friend
        </button>
        <br />
        <button
          type="button"
          className="close-modal close-friend-modal modal-btn"
          onClick={() => toggleModal("friend")}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

const AddNewExpenseModal = ({ toggleModal }) => (
  <Modal
    isOpen={true}
    contentLabel="Add New Expense"
    ariaHideApp={false}
    className="add-expense-modal modal-window"
  >
    <form className="add-expense-form">
      <header className="modal-header add-expense-header">
        Add new Expense
      </header>
      <div className="expense-name-input input-div">
        <label htmlFor="expense-name">Expense Name</label>
        <input id="expense-name" type="text" required />
      </div>
      <div className="expense-amt-input input-div">
        <label htmlFor="expense-amount">Amount</label>
        <input id="expense-amount" type="number" required />
      </div>
      <div className="expense-partner-input input-div">
        <label htmlFor="expense-partner">Select expense partner</label>
        <select name="expense-partner" id="expense-partner" required>
          <option value="choose">-Choose a friend-</option>
        </select>
      </div>
      <div className="payer-input input-div">
        <label htmlFor="payer">Paid by:</label>
        <select name="payer" id="payer" required />
      </div>
      <button type="submit" className="expense-btn modal-btn">
        Add Expense
      </button>
      <br />
      <button
        type="button"
        className="close-modal close-expense-modal modal-btn"
        onClick={() => toggleModal("expense")}
      >
        Cancel
      </button>
    </form>
  </Modal>
);

function UsersData() {
  return <div className="users-data" />;
}

export default class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendModal: false,
      expenseModal: false,
      allUsers: [
        {
          userName: "You",
          userId: "user-0",
          userBalance: 0
        }
      ]
    };
  }
  toggleModal = ClickedBtn => {
    ClickedBtn === "friend"
      ? this.setState({ friendModal: !this.state.friendModal })
      : this.setState({ expenseModal: !this.state.expenseModal });
  };
  addFriend = e => {
    console.log("Friend added");
    // this.setState({ friendModal: !this.state.friendModal })
    e.preventDefault();
  };

  render() {
    return (
      <div className="app-dashboard">
        <Header title="Go-Dutch App" />
        <AddNewBtns toggleModal={this.toggleModal} />
        <UsersData />
        {this.state.friendModal && (
          <AddFriendModal
            toggleModal={this.toggleModal}
            addFriend={this.addFriend}
          />
        )}
        {this.state.expenseModal && (
          <AddNewExpenseModal toggleModal={this.toggleModal} />
        )}
      </div>
    );
  }
}
