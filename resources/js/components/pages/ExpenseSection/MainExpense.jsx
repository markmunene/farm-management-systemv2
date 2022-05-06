import React, { useState, useEffect, useRef } from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import "./expense.css";
import ProgressBar from "../../ProgressBar";

import { PieChart } from "react-minimal-pie-chart";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

export default function MainExpense() {
    const modalRef = useRef({});
    const modalEdit = useRef({});
    const modalExpense = useRef({});
    const modalAllExpenses = useRef({});
    const modalTable = useRef({});

    const modalDelete = useRef({});
    const [image, setImage] = useState("");
    const [Balance, setBalance] = useState(0);
    const [percentageBalUsed, setpercentageBalUsed] = useState(0);

    const [succ, setSucc] = useState("");
    const [feedback, setFeedback] = useState(false);
    const [Description, setDescription] = useState("");
    const [Description1, setDescription1] = useState("");

    const [ExpenseName, setExpenseName] = useState("");
    const [ExpenseAmount, setExpenseAmount] = useState("");
    const [Income, setIncome] = useState("");
    const [IncomeName, setIncomeName] = useState("");

    const [errors, setErrors] = useState([]);

    const [fetchedExpense, setfetchedExpense] = useState([]);
    const [chartData, setchartData] = useState([]);



    const [editMOde, setEditMode] = useState(false);

    const [imageDeleteId, setDeleteId] = useState(0);
    const [TotalIncome, setTotalIncome] = useState(0);

    const getExpense = async () => {
        try {
            await axios.get("api/Expense").then((res) => {
                setfetchedExpense(res.data);
            });
        } catch (err) {}
    };
    useEffect(() =>
    {
        setchartData([]);
        let testnum = 0;
            fetchedExpense.map((item) => {
                var randomColor = "#000000".replace(/0/g, function () {
                    return (~~(Math.random() * 16)).toString(16);
                });
                if (item.Expense_name !== null) {
                    let insert = {
                       
                        color: randomColor,
                        title: item?.Expense_name,
                        value: item?.Expense_amount,
                    };
                   
                    if (testnum !== item.id) {
                            testnum = item.id;
                            return setchartData((prev) => [...prev, insert]);
                        }
                    
                    // chartData?.push(insert);
                }

              

                // console.log(chartData);
            });
        }, [fetchedExpense.length]);
    useEffect(() => {
        getExpense();

        return () => {};
    }, []);
    useEffect(() => {
        let percentB = 0;
        let Bal = 0;
        let Income = 0;

        fetchedExpense.filter((items) => {
            if (items.Expense_amount != null) {
                Bal += items.Expense_amount;
                return setBalance(Bal);
            } else if (items.Income_amount != null) {
                //   console.log(items.Income_amount);
                Income += items.Income_amount;
                return setTotalIncome(Income);
            }
        });
        if (Income >0) {
            percentB = (Bal / Income) * 100;
        }
        if (percentB > 0) {
            setpercentageBalUsed(percentB.toFixed());
        }

        return () => {};
    }, [fetchedExpense.length]);

    // console.log(Balance);
    // delete a post
    const removeTour = (id) => {
        const newImg = fetchedExpense.filter((item) => item.id !== id);

        setfetchedExpense(newImg);
    };
    // handling the image
    const handlefile = (file) => {
        setImage(file[0]);
    };
    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{errors[field][0]}</strong>
                </span>
            );
        }
    };

    const hasErrorFor = (field) => {
        return !!errors[field];
    };

    const editDataHandling = (items) => {
        $(modalEdit.current)?.modal("show");
        // .style.display = "block";
        setEditMode(true);

        setDescription(items.Description);
        setExpenseName(items.ExpenseName);

        setIncome(items.Income);
        setExpenseAmount(items.ExpenseAmount);
        return setEditImg(items);
    };

    const handleIncomeSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("Income", Income);
        fd.append("IncomeName", IncomeName);
        fd.append("Description", Description1);
        axios
            .post("/api/Expense/store", fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) =>
            {
                 setchartData([]);
                setDescription1("");
                setIncome("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                window.alert("Income added Succcessively");
                setSucc("Income added Succcessively");
                $(modalExpense.current).modal("hide");

                getExpense();
            })
            .catch((err) => {
                // setErrors(err.response.data.errors);
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }

                // console.log(err.response.errors);
            });
    };
    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();

        fd.append("ExpenseName", ExpenseName);
        fd.append("ExpenseAmount", ExpenseAmount);

        fd.append("Description", Description);

        axios
            .post("/api/Expense/Expensestore", fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) =>
            {
                
                setExpenseName("");
                setDescription("");
                setExpenseAmount("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                window.alert("Expense added Succcessively");
                setSucc("Expense added Succcessively");
                $(modalRef.current).modal("hide");
                
                getExpense();
            })
            .catch((err) => {
                // setErrors(err.response.data.errors);
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }

                // console.log(err.response.errors);
            });
    };

    const handleEdit = (e, ExpenseId) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("image", image);

        fd.append("Income", Income);
        fd.append("ExpenseName", ExpenseName);
        fd.append("ExpenseAmount", ExpenseAmount);

        fd.append("Description", Description);
        fd.append("ExpenseId", ExpenseId);

        axios
            .post(`/api/ExpenseD/update/${ExpenseId}`, fd, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((result) => {
                setImage("");

                setDescription("");
                setExpenseName("");
                setIncome("");
                setExpenseAmount("");
                setFeedback(true);
                setTimeout(() => {
                    setFeedback(false);
                }, 2500);
                setSucc("Expense Updated Succcessively");
                $(modalEdit.current).modal("hide");

                getExpense();
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                }
            });
    };
    const handleDelete = (id) => {
        $(modalDelete.current)?.modal("show");
        return setDeleteId(id);
    };
    const handleAllExpenses = () => {
        $(modalAllExpenses.current)?.modal("show");
    };
    const handleIncomeModal = () => {
        $(modalExpense.current).modal("show");
    };
    const handleAddModal = () => {
        $(modalRef.current).modal("show");
    };
    const testData = [{ bgcolor: "#006600", completed: percentageBalUsed }];
    const data = [
        {
            value: 30,
            color: "#E38627",
        },
        {
            value: 30,
            color: "#E38627",
        },
        {
            value: 30,
            color: "#E38627",
        },
        {
            value: 35,
            color: "#C13C37",
        },
        {
            value: 30,
            color: "#6A2135",
        },
    ];
    // console.log(data ,"data");
    const CsvHeaders = [
        { label: "Sno", key: "id" },
        { label: "ExpenseName", key: "Expense_name" },
        { label: "ExpenseAmount", key: "Expense_amount" },
        { label: "Description", key: "Description" },
    ];

    return (
        <>
            <div className="modal fade" id="modal-default" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"> Add Income</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            onSubmit={handleIncomeSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="modal-body">
                                {/*  */}
                                <div className="form-group">
                                    <label>Income Name:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("IncomeName")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Income"
                                        placeholder="Income Name"
                                        name="Income"
                                        value={IncomeName}
                                        onChange={(e) => {
                                            setIncomeName(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("IncomeName")}
                                </div>
                                <div className="form-group">
                                    <label>Income:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("Income")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Income"
                                        placeholder="Income"
                                        name="Income"
                                        value={Income}
                                        onChange={(e) => {
                                            setIncome(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Income")}
                                </div>
                                {/*  */}

                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea
                                        className={`form-control ${
                                            hasErrorFor("Description")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Description"
                                        placeholder="Description"
                                        name="Description"
                                        value={Description1}
                                        onChange={(e) => {
                                            setDescription1(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Description")}
                                </div>
                            </div>

                            <div className="modal-footer justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value=" Save"
                                />
                            </div>
                        </form>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>

            {/*modal to show all expenses and to print  */}
            <div
                className="modal fade w-100"
                id="modal-default"
                // style={{width : '100vh'}}
                ref={modalAllExpenses}
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-2">
                            <h4 className="modal-title">All Expense</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="d-flex my-1">
                            <CSVLink
                                data={fetchedExpense.filter(item => item.Expense_name !== null)}
                                headers={CsvHeaders}
                                filename={"my-file.csv"}
                                className="btn btn-success mx-2"
                                target="_blank"
                            >
                                CSV
                            </CSVLink>
                            <ReactToPrint
                                trigger={() => (
                                    <button className="btn btn-warning mx-28">
                                        PDF
                                    </button>
                                )}
                                content={() => modalTable.current}
                            />
                        </div>
                        <div className="table-responsive-sm ExpenseTable ">
                            <table
                                className="table table-striped "
                                ref={modalTable}
                            >
                                <thead>
                                    <tr>
                                        <th>Sno</th>
                                        <th>ExpenseName</th>
                                        <th>ExpenseAmount</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fetchedExpense
                                        .filter(
                                            (items) =>
                                                items.Expense_amount != null
                                        )
                                        .map((items) => {
                                            return (
                                                <React.Fragment key={items.id}>
                                                    <tr>
                                                        <td>{items.id}</td>
                                                        <td>
                                                            {items.Expense_name}
                                                        </td>
                                                        <td>
                                                            {
                                                                items.Expense_amount
                                                            }
                                                        </td>
                                                        <td>
                                                            {items.Description}
                                                        </td>
                                                        <td>
                                                            <i
                                                                className="fa fa-trash text-danger"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        items.id
                                                                    )
                                                                }
                                                            ></i>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>

                        <div className="modal-footer justify-content-between">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>

            <div className="modal fade" id="modal-default" ref={modalExpense}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"> Add Expense</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            onSubmit={handleExpenseSubmit}
                            encType="multipart/form-data"
                        >
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea
                                        className={`form-control ${
                                            hasErrorFor("Description")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Description"
                                        placeholder="Description"
                                        name="Description"
                                        value={Description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Description")}
                                </div>
                                {/*  */}
                                <div className="form-group">
                                    <label>ExpenseName:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("ExpenseName")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="ExpenseName"
                                        placeholder="ExpenseName"
                                        name="ExpenseName"
                                        value={ExpenseName}
                                        onChange={(e) => {
                                            setExpenseName(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("ExpenseName")}
                                </div>
                                {/*  */}
                                <div className="form-group">
                                    <label>ExpenseAmount:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("ExpenseAmount")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="ExpenseAmount"
                                        placeholder="ExpenseAmount"
                                        name="ExpenseAmount"
                                        value={ExpenseAmount}
                                        onChange={(e) => {
                                            setExpenseAmount(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("ExpenseAmount")}
                                </div>
                            </div>

                            <div className="modal-footer justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value=" Save"
                                />
                            </div>
                        </form>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>

            <div className="modal fade" id="modal-default" ref={modalDelete}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Delete Expense</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <center>
                                <h5>
                                    do you relay want to Delete this Expense ?
                                </h5>
                            </center>
                        </div>

                        <div className="modal-footer justify-content-between">
                            <button
                                type="button"
                                className="btn btn-success"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={async () => {
                                    try {
                                        await axios
                                            .delete(
                                                `/api/Expense/${imageDeleteId}`
                                            )
                                            .then((response) => {
                                                removeTour(imageDeleteId);
                                                $(modalDelete.current).modal(
                                                    "hide"
                                                );

                                                setFeedback(true);
                                                setTimeout(() => {
                                                    setFeedback(false);
                                                }, 2500);
                                                setSucc(
                                                    "Expense Deleted Succcessively"
                                                );
                                            });
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>

            <div className="modal fade" ref={modalEdit}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Expense</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form
                            // onSubmit={(e) => handleEdit(e, eItems.id)}
                            encType="multipart/form-data"
                        >
                            <div className="modal-body">
                                {/*  */}
                                <div className="form-group">
                                    <label>Income:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("Income")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Income"
                                        placeholder="Income"
                                        name="Income"
                                        value={Income}
                                        onChange={(e) => {
                                            setIncome(
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                )
                                            );
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Income")}
                                </div>
                                {/*  */}

                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea
                                        className={`form-control ${
                                            hasErrorFor("Description")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="Description"
                                        placeholder="Description"
                                        name="Description"
                                        value={Description}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("Description")}
                                </div>
                                {/*  */}
                                <div className="form-group">
                                    <label>ExpenseName:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("ExpenseName")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="ExpenseName"
                                        placeholder="ExpenseName"
                                        name="ExpenseName"
                                        value={ExpenseName}
                                        onChange={(e) => {
                                            setExpenseName(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("ExpenseName")}
                                </div>
                                {/*  */}
                                <div className="form-group">
                                    <label>ExpenseAmount:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            hasErrorFor("ExpenseAmount")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id="ExpenseAmount"
                                        placeholder="ExpenseAmount"
                                        name="ExpenseAmount"
                                        value={ExpenseAmount}
                                        onChange={(e) => {
                                            setExpenseAmount(e.target.value);
                                        }}
                                        required
                                    />
                                    {renderErrorFor("ExpenseAmount")}
                                </div>
                                {/*  */}

                                <div className="mb-3">
                                    <img
                                        // src={
                                        //     "./uploadedImages/" +
                                        //     // eItems.ImageName
                                        // }
                                        alt=""
                                        className=" img-fluid
                                                                                                 "
                                        height={"100px"}
                                        width={"100px"}
                                    />
                                </div>
                                <div className="custom-file pb-3">
                                    <input
                                        type="file"
                                        className={`form-control custom-file-input ${
                                            hasErrorFor("image")
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                        id=""
                                        onChange={(e) =>
                                            handlefile(e.target.files)
                                        }
                                    />
                                    <label className="custom-file-label">
                                        choose an image
                                    </label>
                                    {renderErrorFor("image")}
                                </div>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <input
                                    type="submit"
                                    className="btn btn-success"
                                    value=" Save"
                                />
                            </div>
                        </form>
                    </div>
                    {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
            </div>
            <div className="header">
                <div className="line"></div>
                <h2 className="text-center">Expense Recorder</h2>
            </div>
            <div className="mainExpense   ">
                <div className="expenseWrapper  ">
                    <div className="parentCard">
                        <div className="expenseCard   ">
                            <div className="header d-flex justify-content-between">
                                <p className="p-2 ">
                                    <strong>Expense OverView</strong>
                                </p>
                                {/* <select
                                    name=""
                                    id=""
                                    className="form-control my-2 w-50"
                                    style={{
                                        width: "20vw",
                                    }}
                                >
                                    <option value="last-week">last-week</option>
                                    <option value="last-month">
                                        last-Month
                                    </option>
                                    <option value="last-year">last-year</option>
                                </select> */}
                            </div>

                            <div className="LatestExpenses  d-flex ">
                                <div
                                    className=""
                                    style={{ width: "200px", height: "200px" }}
                                >
                                    <PieChart
                                        animate
                                        animationDuration={500}
                                        animationEasing="ease-out"
                                        center={[50, 50]}
                                        data={chartData}
                                        lengthAngle={360}
                                        lineWidth={15}
                                        paddingAngle={0}
                                        radius={50}
                                        rounded
                                        startAngle={0}
                                        viewBoxSize={[100, 100]}
                                        label={(data) =>
                                            data.dataEntry.title.substring(
                                                0,
                                                10
                                            )
                                        }
                                        labelPosition={70}
                                        labelStyle={{
                                            fontSize: "10px",
                                            fontColor: "FFFFFA",
                                            fontWeight: "200",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="navigation w-100 ml-5 d-flex justify-content-center">
                                <button
                                    className="btn btn-info"
                                    onClick={() => handleAllExpenses()}
                                >
                                    Show More
                                </button>
                            </div>
                        </div>
                        <div className="expenseCard mx-2">
                            <div className="header d-flex justify-content-between">
                                <p className="p-2 ">
                                    <strong>Balance OverView</strong>
                                </p>
                            </div>
                            <div className="expenseTotals">
                                <h5>
                                    <strong>
                                        Remaining Kesh::{TotalIncome - Balance}
                                    </strong>
                                    <br />
                                </h5>
                            </div>
                            <div className="progressBar my-2">
                                <h5>
                                    <strong>Has used::</strong>
                                </h5>
                                <div className="Values">
                                    {testData.map((item, index) => (
                                        <ProgressBar
                                            key={index}
                                            bgcolor={item.bgcolor}
                                            completed={item.completed}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className=" GraphCard">
                            <h2 className="text-center my-2">
                                Cash spending Graph
                            </h2>
                            <LineChart
                                width={1000}
                                height={300}
                                data={fetchedExpense.filter(
                                    (items) => items.Expense_amount != null
                                )}
                                margin={{
                                    top: 5,
                                    right: 20,
                                    bottom: 5,
                                    left: 0,
                                }}
                            >
                                <Line
                                    type="monotone"
                                    dataKey="Expense_amount"
                                    stroke="#8884d8"
                                />
                                <CartesianGrid
                                    stroke="#ccc"
                                    strokeDasharray="5 5"
                                />
                                <XAxis dataKey="Expense_name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </div>
                    </div>
                </div>
                <div className="inputbtn">
                    <div className="serahcTitle d-flex justify-content-center">
                        <h4>Expense Operations</h4>
                    </div>
                    <div className="inputForm">
                        <button
                            className="btn btn-info"
                            onClick={() => {
                                handleAddModal();
                            }}
                        >
                            <i className="fas fa-plus-square mr-1"></i>
                            Add Income
                        </button>
                        <button
                            className="btn btn-info my-2"
                            onClick={() => {
                                handleIncomeModal();
                            }}
                        >
                            <i className="fas fa-plus-square mr-1"></i>
                            Add Expense
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
