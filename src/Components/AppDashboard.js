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
          onSubmit={e => {
            this.props.addFriend(this.state.friendName);
            e.preventDefault();
          }}
        >
          <div className="friend-name-input">
            <label htmlFor="friend-name">Name:</label>
            <input
              id="friend-name"
              type="text"
              value={this.state.friendName}
              onChange={this.handleChange}
              required
              autoFocus={true}
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
      expenseId: 0,
      expenseName: "",
      expenseAmount: "",
      selectedPartner: {
        name: "",
        id: ""
      },
      payer: {
        name: "",
        id: ""
      }
    };
  }
  handleChange = e => {
    if (e.target.name === "expenseName" || e.target.name === "expenseAmount") {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        [e.target.name]: {
          name: e.target.value,
          id: +e.target.options[e.target.selectedIndex].getAttribute(
            "data-userkey"
          )
        }
      });
    }
  };

  render() {
    let partnersToUI = this.props.allUsers.slice(1);
    return (
      <Modal
        isOpen={true}
        contentLabel="Add New Expense"
        ariaHideApp={false}
        className="add-expense-modal  modal-window"
      >
        <form
          onSubmit={e => {
            this.props.addExpense(this.state);
            e.preventDefault();
          }}
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
              value={this.state.expenseName}
              onChange={this.handleChange}
              required
              autoFocus={true}
            />
          </div>
          <div className="expense-amt-input input-div">
            <label htmlFor="expense-amount">Amount</label>
            <input
              id="expense-amount"
              name="expenseAmount"
              type="number"
              value={this.state.expenseAmount}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="selectedPartner-input input-div">
            <label htmlFor="selectedPartner">Select expense partner</label>
            <select
              name="selectedPartner"
              value={this.state.selectedPartner.name}
              onChange={this.handleChange}
              required
            >
              <option name="selectedPartner" value="choose">
                -Choose a friend-
              </option>
              {partnersToUI.map(({ userId, userName }) => {
                return (
                  <option
                    name="selectedPartner"
                    data-userkey={userId}
                    value={userName}
                    key={userId}
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
                onChange={this.handleChange}
                value={this.state.payer.name}
                required
              >
                <option name="payer" value="">
                  --
                </option>
                <option name="payer" data-userkey="0" value="You">
                  You
                </option>
                <option
                  name="payer"
                  data-userkey={this.state.selectedPartner.id}
                  value={this.state.selectedPartner.name}
                >
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

class EditExpenseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseId: this.props.expenseToEdit.expenseId,
      expenseName: this.props.expenseToEdit.expenseName,
      expenseAmount: this.props.expenseToEdit.expenseAmount,
      selectedPartner: {
        name: this.props.expenseToEdit.selectedPartner.name,
        id: this.props.expenseToEdit.selectedPartner.id
      },
      payer: {
        name: this.props.expenseToEdit.payer.name,
        id: this.props.expenseToEdit.payer.id
      }
    };
  }

  handleChange = e => {
    if (e.target.name === "expenseName" || e.target.name === "expenseAmount") {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        [e.target.name]: {
          name: e.target.value,
          id: +e.target.options[e.target.selectedIndex].getAttribute(
            "data-userkey"
          )
        }
      });
    }
  };
  render() {
    let partnersToUI = this.props.allUsers.slice(1);
    return (
      <Modal
        isOpen={true}
        contentLabel="Edit Expense"
        ariaHideApp={false}
        className="edit-expense-modal modal-window"
      >
        <form
          className="edit-expense-form"
          onSubmit={e => {
            this.props.updateExpense(this.state);
            e.preventDefault();
          }}
        >
          <header className="modal-header edit-expense-header">
            Add new Expense
          </header>
          <div className="expense-name-input input-div">
            <label htmlFor="expense-name">Expense Name</label>
            <input
              name="expenseName"
              required
              value={this.state.expenseName}
              onChange={this.handleChange}
              autoFocus={true}
            />
          </div>
          <div className="expense-amt-input input-div">
            <label htmlFor="expense-amount">Amount</label>
            <input
              name="expenseAmount"
              required
              value={this.state.expenseAmount}
              onChange={this.handleChange}
            />
          </div>
          <div className="selectedPartner-input input-div">
            <label htmlFor="selectedPartner">Select expense partner</label>
            <select
              name="selectedPartner"
              required
              value={this.state.selectedPartner.name}
              onChange={this.handleChange}
            >
              <option name="selectedPartner" value="choose">
                -Choose a friend-
              </option>
              {partnersToUI.map(({ userId, userName }) => {
                return (
                  <option
                    name="selectedPartner"
                    value={userName}
                    data-userkey={userId}
                    onChange={this.handleChange}
                    key={userId}
                  >
                    {userName}
                  </option>
                );
              })}
            </select>
          </div>
          {!!this.state.selectedPartner.name && (
            <div className="payer-input input-div">
              <label htmlFor="payer">Paid by:</label>
              <select
                name="payer"
                onChange={this.handleChange}
                value={this.state.payer.name}
                required
              >
                <option name="payer" value="">
                  --
                </option>
                <option name="payer" data-userkey="0" value="You">
                  You
                </option>
                <option
                  name="payer"
                  data-userkey={this.state.selectedPartner.id}
                  value={this.state.selectedPartner.name}
                >
                  {this.state.selectedPartner.name}
                </option>
              </select>
            </div>
          )}
          <button type="submit" className="expense-btn modal-btn">
            Edit Expense
          </button>
          <br />
          <button
            type="button"
            className="close-modal close-expense-modal modal-btn"
            onClick={() => this.props.toggleModal("edit")}
          >
            Cancel
          </button>
        </form>
      </Modal>
    );
  }
}

function UsersData({
  allUsers,
  allExpenses,
  deleteExpense,
  editExpense,
  editExpense
}) {
  let usersToUI = allUsers.slice(1);
  return (
    <div className="users-data">
      {usersToUI.map(({ userName, userId, userBalance }) => {
        return (
          <div key={userId} className="user-data">
            <div className="user-summary">
              <div className="user-details">
                <div className={`${userId} user-name`}>{userName}</div>
                <div className={`${userId}-balance user-balance`}>
                  {!!userBalance && userBalance}
                </div>
              </div>
            </div>
            <ExpenseToUI
              currentUser={{ userName, userId, userBalance }}
              allExpenses={allExpenses}
              deleteExpense={deleteExpense}
              editExpense={editExpense}
              editExpense={editExpense}
              allUsers={allUsers}
            />
          </div>
        );
      })}
    </div>
  );
}

function ExpenseToUI({
  currentUser,
  allExpenses,
  deleteExpense,
  editExpense,
  allUsers
}) {
  return (
    <div className="user-balance-sheet">
      {allExpenses.map(
        (
          { expenseId, expenseName, expenseAmount, selectedPartner, payer },
          index
        ) => {
          if (currentUser.userId == selectedPartner.id) {
            return (
              <div key={expenseId} className="expense-item">
                <div className="expense-detail">
                  {`${payer.name} paid ${expenseAmount} for ${expenseName}`}
                </div>
                <div className="modify-expense">
                  <div
                    className="edit-expense"
                    onClick={() => editExpense(expenseId)}
                  >
                    Edit
                  </div>
                  <div
                    className="delete-expense"
                    onClick={() => deleteExpense(expenseId)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            );
          }
        }
      )}
    </div>
  );
}

export default class AppDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendModal: false,
      expenseModal: false,
      editExpenseModal: false,
      allUsers: [
        {
          userName: "You",
          userId: 0,
          userBalance: 0
        },
        {
          userName: "Itika",
          userId: 1,
          userBalance: 0
        },
        {
          userName: "Apoorv",
          userId: 2,
          userBalance: 0
        },
        {
          userName: "Lucky",
          userId: 3,
          userBalance: 0
        }
      ],
      allExpenses: [],
      expenseToEdit: {
        expenseId: 0,
        expenseName: "",
        expenseAmount: "",
        selectedPartner: {
          name: "",
          id: ""
        },
        payer: {
          name: "",
          id: ""
        }
      }
    };
  }
  toggleModal = clickedBtn => {
    switch (clickedBtn) {
      case "friend":
        this.setState({ friendModal: !this.state.friendModal });
        break;
      case "expense":
        this.setState({ expenseModal: !this.state.expenseModal });
        break;
      case "edit":
        this.setState({ editExpenseModal: !this.state.editExpenseModal });
        break;
    }
  };

  addExpense = ({
    expenseName,
    expenseId,
    expenseAmount,
    selectedPartner,
    payer
  }) => {
    expenseId = Date.now();
    this.setState({
      allExpenses: [
        ...this.state.allExpenses,
        { expenseName, expenseId, expenseAmount, selectedPartner, payer }
      ],
      expenseModal: !this.state.expenseModal
    });
    this.splitExpenses();
  };

  editExpense = expenseId => {
    let expenseToEdit = this.state.allExpenses.find(
      expense => expenseId === expense.expenseId
    );
    this.setState({
      expenseToEdit,
      editExpenseModal: !this.state.editExpenseModal
    });
  };

  updateExpense = ({
    expenseName,
    expenseId,
    expenseAmount,
    selectedPartner,
    payer
  }) => {
    let expenseIndex = this.state.allExpenses.findIndex(
      expense => expense.expenseId === expenseId
    );
    let allExpenses = [
      ...this.state.allExpenses.slice(0, expenseIndex),
      { expenseName, expenseId, expenseAmount, selectedPartner, payer },
      ...this.state.allExpenses.slice(expenseIndex + 1)
    ];

    this.setState({
      allExpenses,
      editExpenseModal: !this.state.editExpenseModal,
      expenseToEdit: {
        expenseId: 0,
        expenseName: "",
        expenseAmount: "",
        selectedPartner: {
          name: "",
          id: ""
        },
        payer: {
          name: "",
          id: ""
        }
      }
    });
    this.splitExpenses();
  };

  splitExpenses = () => {
    const allUsers = this.state.allUsers.map(user => {
      let userBalance = 0;
      this.state.allExpenses
        .filter(expense => expense.selectedPartner.id === user.userId)
        .forEach(expense => {
          expense.payer.name === "You"
            ? (userBalance -= expense.expenseAmount / 2)
            : (userBalance += expense.expenseAmount / 2);
        });
      return { ...user, userBalance };
    });
    this.setState({ allUsers });
  };

  deleteExpense = expenseId => {
    let allExpenses = this.state.allExpenses.filter(
      expense => expenseId !== expense.expenseId
    );
    this.setState({ allExpenses });
  };

  addFriend = friendName => {
    let friendName = formatInput(friendName);
    let user = {
      userName: friendName,
      userId: Date.now(),
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
        <UsersData
          allUsers={this.state.allUsers}
          allExpenses={this.state.allExpenses}
          deleteExpense={this.deleteExpense}
          editExpense={this.editExpense}
          toggleModal={this.toggleModal}
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
            editExpense={this.editExpense}
          />
        )}
        {this.state.editExpenseModal && (
          <EditExpenseModal
            toggleModal={this.toggleModal}
            allUsers={this.state.allUsers}
            expenseToEdit={this.state.expenseToEdit}
            editExpense={this.editExpense}
            updateExpense={this.updateExpense}
          />
        )}
      </div>
    );
  }
}
