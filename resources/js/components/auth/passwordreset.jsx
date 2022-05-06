import React from 'react'

export default  function PasswordResetComponent ()
{
 
  return (
    <div>
  <form
                            
                            encType="multipart/form-data"
                        >
                           
                               
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
  )
}
