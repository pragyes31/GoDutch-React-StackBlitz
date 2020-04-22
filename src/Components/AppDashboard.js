import React from "react";
import Modal from "react-modal";

function Header({ title }) {
  return (
    <div className="header">
      <header className="main-title">{title}</header>
    </div>
  );
}

const formatInput = input => {
  let newInput = input.trim();
  return newInput.charAt(0).toUpperCase() + newInput.slice(1);
};

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

class AddFriendModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendName: ""
    };
  }

  handleChange = e => {
    this.setState({ friendName: e.target.value });
  };
  render() {
    return (
      <Modal
        isOpen={true}
        contentLabel="Add New Friend"
        ariaHideApp={false}
        className="add-friend-modal modal-window"
      >
        <header className="modal-header add-friend-header">
          Add new Friend
        </header>
        <form
          className="add-friend-form"
          onSubmit={e => this.props.addFriend(e, this.state.friendName)}
        >
          <div className="friend-name-input">
            <label htmlFor="friend-name">Name:</label>
            <input
              id="friend-name"
              type="text"
              value={this.state.friendName}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="friend-btn modal-btn">
            Add Friend
          </button>
          <br />
          <button
            type="button"
            className="close-modal close-friend-modal modal-btn"
            onClick={() => this.props.toggleModal("friend")}
          >
            Cancel
          </button>
        </form>
      </Modal>
    );
  }
}

class AddExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseName: "",
      expenseAmount: "",
      selectedPartner: {
        name:"",
        id:""
      },
      payer: {
        name:"",
        id:""
      }
    };
  }
  handleChange = e => {
    if(e.target.name === "expenseName" || e.target.name === "expenseAmount") {
    this.setState({ [e.target.name]: e.target.value });
    }
    else {
      this.setState({
        [e.target.name]: {
          name: e.target.value,
          id: e.target.options[e.target.selectedIndex].getAttribute("userkey")
        }
      });
      setTimeout(() => console.log(this.state.selectedPartner), 100)
    }
    
  };
  render() {
    let payerToUI = this.props.allUsers.slice(1);
    return (
      <Modal
        isOpen={true}
        contentLabel="Add New Expense"
        ariaHideApp={false}
        className="add-expense-modal modal-window"
      >
        <form
          onSubmit={(e) =>
            this.props.addExpense(
              e,
              this.state
            )
          }
          className="add-expense-form"
        >
          <header className="modal-header add-expense-header">
            Add new Expense
          </header>
          <div className="expense-name-input input-div">
            <label htmlFor="expense-name">Expense Name</label>
            <input
              id="expense-name"
              name="expenseName"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="expense-amt-input input-div">
            <label htmlFor="expense-amount">Amount</label>
            <input
              id="expense-amount"
              name="expenseAmount"
              type="number"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="selectedPartner-input input-div">
            <label htmlFor="selectedPartner">Select expense partner</label>
            <select
              name="selectedPartner"
              id="selectedPartner"
              value={this.state.selectedPartner.name}
              onChange={this.handleChange}
              required
            >
              <option name="selectedPartner" value="choose">-Choose a friend-</option>
              {payerToUI.map(({ userId, userName }) => {
                return (
                  <option
                    name="selectedPartner"
                    userkey={userId}
                    value={userName}
                  >
                    {userName}
                  </option>
                );
              })}
            </select>
          </div>

          {!!this.state.selectedPartner && (
            <div className="payer-input input-div">
              <label htmlFor="payer">Paid by:</label>
              <select
                name="payer"
                id="payer"
                onChange={this.handleChange}
                required
              >
                <option name="payer" value="">--</option>
                <option name="payer" userkey="user-0" value="You">You</option>
                <option name="payer" userkey={this.state.selectedPartner.id} value={this.state.selectedPartner.name}>
                  {this.state.selectedPartner.name}
                </option>
              </select>
            </div>
          )}
          <button type="submit" className="expense-btn modal-btn">
            Add Expense
          </button>
          <br />
          <button
            type="button"
            className="close-modal close-expense-modal modal-btn"
            onClick={() => this.props.toggleModal("expense")}
          >
            Cancel
          </button>
        </form>
      </Modal>
    );
  }
}

function UsersData({ allUsers, allExpenses }) {
  let usersToUI = allUsers.slice(1);
  return (
    <div className="users-data">
      {usersToUI.map(({ userName, userId, userBalance }) => {
        return (
          <div key={`${userId}-data`} className={`${userId}-data user-data`}>
            <div className="user-summary">
              <div className="user-details">
                <div className={`${userId} user-name`}>{userName}</div>
                <div className={`${userId}-balance user-balance`}>
                  {!!userBalance && userBalance}
                </div>
              </div>
            </div>
            <ExpenseToUI currentUser={{ userName, userId, userBalance }} allExpenses={allExpenses} />
          </div>
        );
      })}
    </div>
  );
}

function ExpenseToUI({currentUser, allExpenses }) {
  return (
    <div className={`${currentUser.userId}-expenses-list user-balance-sheet`} >
      {allExpenses.map(({ expenseName, expenseAmount, selectedPartner, payer }, index) => {
        if (currentUser.userId === selectedPartner.id) {
          return (<div key={currentUser.userId} className={`expense-${index + 1} expense-item`}>
            <div className="expense-detail">
              {`${payer.name} paid ${expenseAmount} for ${expenseName}`}
            </div>
            <div className="modify-expense">
              <div className={`edit-expense-${index + 1} edit-expense`}>Edit</div>
              <div className={`delete-expense-${index + 1} delete-expense`}>Delete</div>
            </div>
          </div>)
        }
      })}
    </div>
  )
}

export default class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendModal: false,
      expenseModal: false,
      expenseCount: 1,
      allUsers: [
        {
          userName: "You",
          userId: "user-0",
          userBalance: 0
        }
      ],
      allExpenses: []
    };
  }
  toggleModal = clickedBtn => {
    clickedBtn === "friend"
      ? this.setState({ friendModal: !this.state.friendModal })
      : this.setState({ expenseModal: !this.state.expenseModal });
  };

  addExpense = (e, currentExpense) => {
    e.preventDefault();

    this.setState({
      allExpenses: [...this.state.allExpenses, currentExpense],
      currentExpense,
      expenseModal: !this.state.expenseModal
    })
  };

  addFriend = (e, friendName) => {
    e.preventDefault();
    let friendName = formatInput(friendName);
    let user = {
      userName: friendName,
      userId: `user-${this.state.allUsers.length}`,
      userBalance: 0
    };
    let allUsers = [...this.state.allUsers, user];
    this.setState({ allUsers, friendModal: !this.state.friendModal });
  };

  render() {
    return (
      <div className="app-dashboard">
        <Header title="Go-Dutch App" />
        <AddNewBtns toggleModal={this.toggleModal} />
        <UsersData allUsers={this.state.allUsers}
          allExpenses={this.state.allExpenses}
        />
        {this.state.friendModal && (
          <AddFriendModal
            toggleModal={this.toggleModal}
            addFriend={this.addFriend}
          />
        )}
        {this.state.expenseModal && (
          <AddExpenseModal
            toggleModal={this.toggleModal}
            allUsers={this.state.allUsers}
            addExpense={this.addExpense}
          />
        )}
      </div>
    );
  }
}
