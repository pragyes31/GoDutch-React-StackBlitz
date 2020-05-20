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
      <div className="add-user">
        <button
          onClick={() => toggleModal("user")}
          className="add-user-btn add-new-btn"
        >
          Add new user
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

class AddUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ""
    };
  }

  handleChange = e => {
    this.setState({ userName: e.target.value });
  };
  render() {
    return (
      <Modal
        isOpen={true}
        contentLabel="Add New user"
        ariaHideApp={false}
        className="add-user-modal modal-window"
      >
        <header className="modal-header add-user-header">Add new user</header>
        <form
          className="add-user-form"
          onSubmit={e => {
            this.props.addUser(this.state.userName);
            e.preventDefault();
          }}
        >
          <div className="user-name-input">
            <label htmlFor="user-name">Name:</label>
            <input
              id="user-name"
              type="text"
              value={this.state.userName}
              onChange={this.handleChange}
              required
              autoFocus={true}
            />
          </div>
          <button type="submit" className="user-btn modal-btn">
            Add user
          </button>
          <br />
          <button
            type="button"
            className="close-modal close-user-modal modal-btn"
            onClick={() => this.props.toggleModal("user")}
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
        id: "",
        sharePercentage: 0
      },
      payer: {
        name: "",
        id: ""
      }
    };
  }
  handleChange = e => {
    // switch (e.target.name) {
    //   case ("expenseName" || "expenseAmount"):
    //     this.setState({
    //       [e.target.name]: e.target.value
    //     });
    //     case ("selectedPartner" || "payer"):
    //     this.setState({
    //     [e.target.name]: {
    //       name: e.target.value,
    //       id: +e.target.options[e.target.selectedIndex].getAttribute(
    //         "data-userkey"
    //       )
    //     }
    //   });
    // }
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
          ),
          sharePercentage: 0
        }
      });
    }
  };

  handleOptionChange = e => {
    this.setState({ equallySplit: !this.state.equallySplit });
  };

  handlePercentage = e => {
    this.setState({ selectedPartner: {} });
  };

  render() {
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
              min={1}
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
                -Choose a user-
              </option>
              {this.props.allUsers.map(({ userId, userName }) => {
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
          {/* <div className="input-div">
            <div>Is the expense split equally?</div>
            <div>
              <input
                type="radio"
                id="yes"
                name="split"
                value="yes"
                onChange={this.handleOptionChange}
                checked={this.state.equallySplit}
              />
              <label htmlFor="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="no"
                name="split"
                value="no"
                onChange={this.handleOptionChange}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          {!this.state.equallySplit && (
            <div>
              <label htmlFor="share-percentage">Your share: </label>
              <input
                type="number"
                name="share-percentage"
                min={0}
                onChange={this.handlePercentage}
                value={this.state.selectedPartner.sharePercentage}
                required
              />
            </div>
          )} */}
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
              min={1}
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
                -Choose a user-
              </option>
              {this.props.allUsers.map(({ userId, userName }) => {
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
  editExpense,
  deleteUser
}) {
  return (
    <div className="users-data">
      {allUsers.map(({ userName, userId, userBalance }) => {
        return (
          <div key={userId} className="user-data">
            <div className="user-summary">
              <div className="user-details">
                <div className={`user-name`}>{userName}</div>
                <div className={`user-balance`}>
                  {!!userBalance && userBalance}
                </div>
              </div>
              <div className="delete-user" onClick={() => deleteUser(userId)}>
                Delete
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
    let allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    this.state = {
      userModal: false,
      expenseModal: false,
      editExpenseModal: false,
      allUsers,
      allExpenses: JSON.parse(localStorage.getItem("allExpenses")) || [],
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
      case "user":
        this.setState({ userModal: !this.state.userModal });
        break;
      case "expense":
        this.setState({ expenseModal: !this.state.expenseModal });
        break;
      case "edit":
        this.setState({ editExpenseModal: !this.state.editExpenseModal });
        break;
    }
  };

  addUser = userName => {
    let userName = formatInput(userName);
    let user = {
      userName,
      userId: Date.now(),
      userBalance: 0
    };
    let allUsers = [...this.state.allUsers, user];
    this.setState(prevState => {
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      return {
        allUsers,
        userModal: !prevState.userModal
      };
    });
  };

  deleteUser = userId => {
    let allUsers = this.state.allUsers.filter(user => userId !== user.userId);
    let allExpenses = this.state.allExpenses.filter(
      expense => userId !== expense.selectedPartner.id
    );
    this.setState(prevState => {
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      return { allUsers, allExpenses };
    });
  };

  addExpense = expense => {
    let expenseId = Date.now();
    expense.expenseId = expenseId;
    let allExpenses = [...this.state.allExpenses, { ...expense }];
    this.setState(prevState => {
      localStorage.setItem("allExpenses", JSON.stringify(allExpenses));
      return {
        allExpenses,
        expenseModal: !prevState.expenseModal
      };
    });
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
    this.setState(prevState => {
      localStorage.setItem("allExpenses", JSON.stringify(allExpenses));
      return {
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
      };
    });
    this.splitExpenses();
  };

  splitExpenses = () => {
    this.setState(prevState => {
      const allUsers = prevState.allUsers.map(user => {
        let userBalance = 0;
        prevState.allExpenses
          .filter(expense => expense.selectedPartner.id === user.userId)
          .forEach(expense => {
            expense.payer.name === "You"
              ? (userBalance -= expense.expenseAmount / 2)
              : (userBalance += expense.expenseAmount / 2);
          });
        return { ...user, userBalance };
      });
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      return { allUsers };
    });
  };

  deleteExpense = expenseId => {
    let allExpenses = this.state.allExpenses.filter(
      expense => expenseId !== expense.expenseId
    );
    this.setState(prevState => {
      localStorage.setItem("allExpenses", JSON.stringify(allExpenses));
      return { allExpenses };
    });
    this.splitExpenses();
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
          deleteUser={this.deleteUser}
          toggleModal={this.toggleModal}
        />
        {this.state.userModal && (
          <AddUserModal toggleModal={this.toggleModal} addUser={this.addUser} />
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
