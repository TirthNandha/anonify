import React from "react";

function YourDetails() {
    const department = "Computer Science";
    const passoutYear = 2022;
    const college = "ABC University";

    return (
        <div style={{paddingLeft: '8px'}}>
            <h3>
                <span style={{ color: "dark" }}>Department:</span>
                <span style={{ fontWeight: "normal" }}> {department}</span>
            </h3>
            <h3>
                <span style={{ color: "dark" }}>Passout Year:</span>
                <span style={{ fontWeight: "normal" }}> {passoutYear}</span>
            </h3>
            <h3>
                <span style={{ color: "dark" }}>College:</span>
                <span style={{ fontWeight: "normal" }}> {college}</span>
            </h3>
        </div>

    );
}

export default YourDetails;