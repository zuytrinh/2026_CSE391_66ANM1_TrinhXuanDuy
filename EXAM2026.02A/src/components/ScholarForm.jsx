import { useState } from "react";

function ScholarForm(props) {
    const [name, setName] = useState("");
    const [sponsor, setSponsor] = useState("");
    const [email, setemail] = useState("");
    const [loi, setLoi] = useState({});
    const [value, setValue] = useState("")
    const [deadline, setDeadline] = useState("")

    const Validate = () => {
        const loiMoi = {};
        if (name.trim() === "") {
            loiMoi.name = "Scholarship name cannot empty";
        } else if (name.length > 50) {
            loiMoi.name = "Scholarshipname length canot higher than 50";
        }
        if (value < 0) {
            loiMoi.value = "Value > 0";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            loiMoi.email = "Email error";
        }
        if (deadline === "") {
            loiMoi.deadline = "Date cannot empty";
        } else if (new Date(deadline) <= new Date()) {
            loiMoi.deadline = "Date need to be in future";
        }
        return loiMoi;
    };

    const handleReset = () => {
        setName("");
        setSponsor("");
        setemail("");
        setDeadline("");
        setValue("");
        setLoi({});
    };

    const handleSubmit = () => {
        const loiKiemTra = Validate();
        if (Object.keys(loiKiemTra).length > 0) {
            setLoi(loiKiemTra);
            return;
        }
        const Scholar = {
            id: Date.now(),
            name: name,
            sponsor: sponsor,
            email: email,
            value: value,
            deadline: deadline,
        };
        props.onAdd(Scholar);
        handleReset();
    };

    return (
        <div className="card" style={{ border: "1px solid #ccc" }}>

            <div
                className="px-3 py-2 mb-3"
                style={{ backgroundColor: "#0d6efd", color: "white", fontSize: "14px" }}
            >
                Add new scholarship
            </div>

            <div className="px-4 pb-4">
                <div className="mb-3">
                    <label className="form-label">Scholarship name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="program title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {loi.name && <p className="text-danger small">{loi.name}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Sponsor</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Company / foundation"
                        value={sponsor}
                        onChange={(e) => setSponsor(e.target.value)}
                    />
                    {loi.sponsor && <p className="text-danger small">{loi.sponsor}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="contact@example.org"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                    />
                    {loi.email && <p className="text-danger small">{loi.email}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Value</label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="e.g. 1200"
                            min="0"
                            step="0.01"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    {loi.value && <p className="text-danger small">{loi.value}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Deadline</label>
                    <input
                        type="date"
                        className="form-control"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    {loi.deadline && <p className="text-danger small">{loi.deadline}</p>}
                </div>

                <button className="btn btn-primary me-2" onClick={handleSubmit}>
                    Save
                </button>
                <button className="btn btn-secondary" onClick={handleReset}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ScholarForm