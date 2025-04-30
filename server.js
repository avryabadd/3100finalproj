const express = require('express')
const cors = require('cors')
const {v4:uuidv4} = require('uuid')
const sqlite3 = require('sqlite3').verbose()
const dbSource = "feedback.db"
const HTTP_PORT = 8000
const bcrypt = require('bcrypt')
const intSalt = 10;
const jwt = require('jsonwebtoken');
const strSecret = 'Mickey2025!Goofy2023!'; // keep this in env in prod
const db = new sqlite3.Database(dbSource, (err) => {
    if (err) console.error("DB connection error:", err.message);
    else console.log("Connected to SQLite DB.");
  });
var app = express()
app.use(cors())
app.use(express.json())
app.post('/user', (req,res,next) => {
const strUserID = uuidv4();
const strFirstName = req.body.firstName?.trim();
const strLastName = req.body.lastName?.trim();
const strEmail = req.body.email?.trim().toLowerCase();
let strPassword = req.body.password;
if (!strFirstName || !strLastName || !strEmail || !strPassword) {
    return res.status(400).json({ error: "All fields are required." });
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(strEmail)) {
return res.status(400).json({ error: "You must provide a valid email address" });
}

// NIST password validation
if (strPassword.length < 8) {
return res.status(400).json({ error: "Password must be at least 8 characters long" });
}
if (!/[A-Z]/.test(strPassword)) {
return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
}
if (!/[a-z]/.test(strPassword)) {
return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
}
if (!/[0-9]/.test(strPassword)) {
return res.status(400).json({ error: "Password must contain at least one number" });
}
if (!/[!@#$%^&*(),.?":{}|<>]/.test(strPassword)) {
return res.status(400).json({ error: "Password must contain at least one special character" });
}

const strHashedPassword = bcrypt.hashSync(strPassword, intSalt);
const strTimestamp = new Date().toISOString();
const strSQL = `INSERT INTO tblUsers (UserID, FirstName, LastName, Email, PasswordHash, CreationDate, LastLogin) VALUES (?, ?, ?, ?, ?, ?, ?)`
const arrParams = [strUserID,strFirstName,strLastName,strEmail,strHashedPassword,strTimestamp,strTimestamp]
db.run(strSQL, arrParams, function (err) {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(400).json({ status: "error", message: err.message });
    }

    return res.status(201).json({
      status: "success",
      userId: strUserID
    })
  })
})

app.post('/phone', (req, res, next) => {
    const strPhoneID = uuidv4();
    const strUserEmail = req.body.userEmail?.trim().toLowerCase();
    const strNationCode = req.body.nationCode?.trim();
    const strAreaCode = req.body.areaCode?.trim();
    const strPhoneNumber = req.body.phoneNumber?.trim();
    const strStatus = req.body.status?.trim();
  
    // ✅ Required field check
    if (!strUserEmail || !strNationCode || !strAreaCode || !strPhoneNumber || !strStatus) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    // ✅ Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(strUserEmail)) {
      return res.status(400).json({ error: "Invalid email format." });
    }
  
    // ✅ Nation code format: + followed by 1–3 digits
    const nationCodeRegex = /^\+\d{1,3}$/;
    if (!nationCodeRegex.test(strNationCode)) {
      return res.status(400).json({ error: "Nation code must be in format +1, +44, etc." });
    }
  
    // ✅ Area code: exactly 3 digits
    if (!/^\d{3}$/.test(strAreaCode)) {
      return res.status(400).json({ error: "Area code must be exactly 3 digits (e.g., 615)." });
    }
  
    // ✅ Phone number: 3 digits + dash + 4 digits
    if (!/^\d{3}-\d{4}$/.test(strPhoneNumber)) {
      return res.status(400).json({ error: "Phone number must be in format XXX-XXXX (e.g., 555-1234)." });
    }
  
    // ✅ Confirm user email exists in tblUsers
    const strCheckSQL = `SELECT * FROM tblUsers WHERE Email = ?`;
    db.get(strCheckSQL, [strUserEmail], (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Database error checking email." });
      }
      if (!row) {
        return res.status(400).json({ error: "Email does not exist in users table." });
      }
  
      // ✅ Insert phone record
      const strSQL = `
        INSERT INTO tblPhone 
        (PhoneID, Email, NationCode, AreaCode, PhoneNumber, Status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
  
      const arrParams = [
        strPhoneID,
        strUserEmail,
        strNationCode,
        strAreaCode,
        strPhoneNumber,
        strStatus
      ];
  
      db.run(strSQL, arrParams, function (err) {
        if (err) {
          console.error("DB Error:", err.message);
          return res.status(400).json({ status: "error", message: err.message });
        }
  
        return res.status(201).json({
          status: "success",
          phoneId: strPhoneID
        });
      });
    });
  });

app.post("/socials", (req, res) => {
const strSocialID = uuidv4();
const strUserEmail = req.body.userEmail?.trim().toLowerCase();
const strSocialType = req.body.socialType?.trim();
const strUsername = req.body.username?.trim();

// ✅ Basic validation
if (!strUserEmail || !strSocialType || !strUsername) {
    return res.status(400).json({ error: "All fields are required." });
}

// ✅ Email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(strUserEmail)) {
    return res.status(400).json({ error: "Invalid email format." });
}

// ✅ Supported social types
const arrAllowedTypes = ["Discord", "Teams", "Slack"];
if (!arrAllowedTypes.includes(strSocialType)) {
    return res.status(400).json({ error: "Unsupported social type." });
}

// ✅ Check that the user email exists in tblUsers
const strCheckSQL = `SELECT * FROM tblUsers WHERE Email = ?`;
db.get(strCheckSQL, [strUserEmail], (err, row) => {
    if (err) {
    return res.status(500).json({ error: "Database error when checking user email." });
    }
    if (!row) {
    return res.status(400).json({ error: "User email does not exist in tblUsers." });
    }

    // ✅ Insert into tblSocials
    const strSQL = `
    INSERT INTO tblSocials (SocialID, Email, SocialType, Username)
    VALUES (?, ?, ?, ?)
    `;
    const arrParams = [strSocialID, strUserEmail, strSocialType, strUsername];

    db.run(strSQL, arrParams, function (err) {
    if (err) {
        console.error("DB Error:", err.message);
        return res.status(400).json({ status: "error", message: err.message });
    }

    return res.status(201).json({
        status: "success",
        socialId: strSocialID
    });
    });
});
});

app.post("/logs", (req, res) => {
    const strLogID = uuidv4();
    const strLogType = req.body.logType?.trim();
    const strDescription = req.body.description?.trim();
    const strTimestamp = new Date().toISOString();
  
    // Validate input
    if (!strLogType || !strDescription) {
      return res.status(400).json({ error: "Log type and description are required." });
    }
  
    const strSQL = `
      INSERT INTO tblLogs (LogID, LogDateTime, Type, Description)
      VALUES (?, ?, ?, ?)
    `;
    const arrParams = [strLogID, strTimestamp, strLogType, strDescription];
  
    db.run(strSQL, arrParams, function (err) {
      if (err) {
        console.error("DB Error:", err.message);
        return res.status(400).json({ status: "error", message: err.message });
      }
  
      return res.status(201).json({
        status: "success",
        logId: strLogID
      });
    });
  });

  app.post("/course-groups", (req, res) => {
    const strGroupID = uuidv4();
    const strGroupName = req.body.groupName?.trim();
    const strCourseID = req.body.courseId?.trim();
    const strCreationDate = new Date().toISOString();
  
    // Validation
    if (!strGroupName || !strCourseID) {
      return res.status(400).json({ error: "Group name and course ID are required." });
    }
  
    // Check if the course exists
    const strCheckSQL = `SELECT * FROM tblCourses WHERE CourseID = ?`;
    db.get(strCheckSQL, [strCourseID], (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Error checking course ID." });
      }
      if (!row) {
        return res.status(400).json({ error: "Course ID does not exist." });
      }
  
      // Insert into tblCourseGroups
      const strSQL = `
        INSERT INTO tblCourseGroups (GroupID, GroupName, CourseID, CreationDate)
        VALUES (?, ?, ?, ?)
      `;
      const arrParams = [strGroupID, strGroupName, strCourseID, strCreationDate];
  
      db.run(strSQL, arrParams, function (err) {
        if (err) {
          console.error("DB Error:", err.message);
          return res.status(400).json({ status: "error", message: err.message });
        }
  
        return res.status(201).json({
          status: "success",
          groupId: strGroupID
        });
      });
    });
  });

  app.post("/courses", (req, res) => {
    const strCourseID = uuidv4();
    const strCourseName = req.body.courseName?.trim();
    const strCourseNumber = req.body.courseNumber?.trim();
    const strCourseSection = req.body.courseSection?.trim();
    const strCourseTerm = req.body.courseTerm?.trim();
  
    // Basic validation
    if (!strCourseName || !strCourseNumber || !strCourseSection || !strCourseTerm) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    const strSQL = `
      INSERT INTO tblCourses (
        CourseID, CourseName, CourseNumber, CourseSection, CourseTerm
      ) VALUES (?, ?, ?, ?, ?)
    `;
  
    const arrParams = [
      strCourseID,
      strCourseName,
      strCourseNumber,
      strCourseSection,
      strCourseTerm
    ];
  
    db.run(strSQL, arrParams, function (err) {
      if (err) {
        console.error("DB Error:", err.message);
        return res.status(400).json({ status: "error", message: err.message });
      }
  
      return res.status(201).json({
        status: "success",
        courseId: strCourseID
      });
    });
  });
  
  app.post("/group-members", (req, res) => {
    const strMemberID = uuidv4();
    const strGroupID = req.body.groupId?.trim();
    const strUserID = req.body.userId?.trim();
    const strJoinDate = new Date().toISOString();
  
    if (!strGroupID || !strUserID) {
      return res.status(400).json({ error: "Group ID and User ID are required." });
    }
  
    const strGroupCheck = `SELECT * FROM tblCourseGroups WHERE GroupID = ?`;
    const strUserCheck = `SELECT * FROM tblUsers WHERE UserID = ?`;
  
    db.get(strGroupCheck, [strGroupID], (err, group) => {
      if (err) return res.status(500).json({ error: "Error checking group ID." });
      if (!group) return res.status(400).json({ error: "Group ID does not exist." });
  
      db.get(strUserCheck, [strUserID], (err, user) => {
        if (err) return res.status(500).json({ error: "Error checking user ID." });
        if (!user) return res.status(400).json({ error: "User ID does not exist." });
  
        const strSQL = `
          INSERT INTO tblGroupMembers (MembershipID, GroupID, UserID, JoinDate)
          VALUES (?, ?, ?, ?)
        `;
        const arrParams = [strMemberID, strGroupID, strUserID, strJoinDate];
  
        db.run(strSQL, arrParams, function (err) {
          if (err) {
            console.error("DB Error:", err.message);
            return res.status(400).json({ status: "error", message: err.message });
          }
  
          return res.status(201).json({
            status: "success",
            memberId: strMemberID
          });
        });
      });
    });
  });

  app.post("/enrollments", (req, res) => {
    const strEnrollmentID = uuidv4();
    const strCourseID = req.body.courseId?.trim();
    const strUserID = req.body.userId?.trim();
    const strEnrollmentDate = new Date().toISOString();
  
    if (!strCourseID || !strUserID) {
      return res.status(400).json({ error: "Course ID and User ID are required." });
    }
  
    const strCheckCourse = `SELECT * FROM tblCourses WHERE CourseID = ?`;
    const strCheckUser = `SELECT * FROM tblUsers WHERE UserID = ?`;
  
    db.get(strCheckCourse, [strCourseID], (err, course) => {
      if (err) return res.status(500).json({ error: "Error checking course ID." });
      if (!course) return res.status(400).json({ error: "Course not found." });
  
      db.get(strCheckUser, [strUserID], (err, user) => {
        if (err) return res.status(500).json({ error: "Error checking user ID." });
        if (!user) return res.status(400).json({ error: "User not found." });
  
        const strSQL = `
          INSERT INTO tblEnrollments (EnrollmentID, CourseID, UserID, EnrollmentDate)
          VALUES (?, ?, ?, ?)
        `;
        const arrParams = [strEnrollmentID, strCourseID, strUserID, strEnrollmentDate];
  
        db.run(strSQL, arrParams, function (err) {
          if (err) {
            console.error("DB Error:", err.message);
            return res.status(400).json({ status: "error", message: err.message });
          }
  
          return res.status(201).json({
            status: "success",
            enrollmentId: strEnrollmentID
          });
        });
      });
    });
  });

  app.post("/assessments", (req, res) => {
    const strAssessmentID = uuidv4();
    const strCourseID = req.body.courseId?.trim();
    const strName = req.body.name?.trim();
    const strStatus = req.body.status?.trim();
    const strType = req.body.type?.trim();
    const strStartDate = req.body.startDate?.trim();
    const strDueDate = req.body.dueDate?.trim();
    const strEndDate = req.body.endDate?.trim();
    const strCreationDate = new Date().toISOString();
  
    if (!strCourseID || !strName || !strStatus || !strType || !strStartDate || !strDueDate || !strEndDate) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    const strCourseCheckSQL = `SELECT * FROM tblCourses WHERE CourseID = ?`;
    db.get(strCourseCheckSQL, [strCourseID], (err, course) => {
      if (err) return res.status(500).json({ error: "Error checking course." });
      if (!course) return res.status(400).json({ error: "Course does not exist." });
  
      const strInsertSQL = `
        INSERT INTO tblAssessments (
          AssessmentID, CourseID, Name, Status, Type,
          StartDate, DueDate, EndDate, CreationDate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const arrParams = [
        strAssessmentID,
        strCourseID,
        strName,
        strStatus,
        strType,
        strStartDate,
        strDueDate,
        strEndDate,
        strCreationDate
      ];
  
      db.run(strInsertSQL, arrParams, function (err) {
        if (err) {
          console.error("DB Error:", err.message);
          return res.status(400).json({ status: "error", message: err.message });
        }
  
        return res.status(201).json({
          status: "success",
          assessmentId: strAssessmentID
        });
      });
    });
  });
  
  app.post("/assessment-questions", (req, res) => {
    const strQuestionID = uuidv4();
    const strAssessmentID = req.body.assessmentId?.trim();
    const strQuestionType = req.body.questionType?.trim();
    const strOptions = req.body.options ? JSON.stringify(req.body.options) : null;
    const strNarrative = req.body.questionNarrative?.trim();
    const strHelperText = req.body.helperText?.trim();
  
    // Basic validation
    if (!strAssessmentID || !strQuestionType || !strNarrative) {
      return res.status(400).json({ error: "Assessment ID, type, and narrative are required." });
    }
  
    // Check if the assessment exists
    const strCheckSQL = `SELECT * FROM tblAssessments WHERE AssessmentID = ?`;
    db.get(strCheckSQL, [strAssessmentID], (err, row) => {
      if (err) return res.status(500).json({ error: "Error checking assessment ID." });
      if (!row) return res.status(400).json({ error: "Assessment does not exist." });
  
      // Insert the question
      const strSQL = `
        INSERT INTO tblAssessmentQuestions (
          QuestionID, AssessmentID, QuestionType, Options,
          QuestionNarrative, HelperText
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;
  
      const arrParams = [
        strQuestionID,
        strAssessmentID,
        strQuestionType,
        strOptions,
        strNarrative,
        strHelperText
      ];
  
      db.run(strSQL, arrParams, function (err) {
        if (err) {
          console.error("DB Error:", err.message);
          return res.status(400).json({ status: "error", message: err.message });
        }
  
        return res.status(201).json({
          status: "success",
          questionId: strQuestionID
        });
      });
    });
  });

  app.post("/assessment-responses", (req, res) => {
    const strResponseID = uuidv4();
    const strAssessmentID = req.body.assessmentId?.trim();
    const strQuestionID = req.body.questionId?.trim();
    const strUserID = req.body.userId?.trim();
    const strTargetUserID = req.body.targetUserId?.trim();
    const strResponse = req.body.response?.trim();
    const strPublic = req.body.public?.toString().toLowerCase() === "true" ? "true" : "false";
    const strSubmitDate = new Date().toISOString();
  
    // Validate required fields
    if (!strAssessmentID || !strQuestionID || !strUserID || !strTargetUserID || !strResponse) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    const strCheckUserSQL = `SELECT * FROM tblUsers WHERE UserID = ?`;
    const strCheckTargetSQL = `SELECT * FROM tblUsers WHERE UserID = ?`;
  
    // Check UserID exists
    db.get(strCheckUserSQL, [strUserID], (err, userRow) => {
      if (err) return res.status(500).json({ error: "Error checking UserID." });
      if (!userRow) return res.status(400).json({ error: "UserID does not exist." });
  
      // Check TargetUserID exists
      db.get(strCheckTargetSQL, [strTargetUserID], (err, targetRow) => {
        if (err) return res.status(500).json({ error: "Error checking TargetUserID." });
        if (!targetRow) return res.status(400).json({ error: "TargetUserID does not exist." });
  
        // Insert response
        const strInsertSQL = `
          INSERT INTO tblAssessmentResponse (
            ResponseID, AssessmentID, QuestionID, ReviewerUserID,
            TargetUserID, Response, isPublic, ResponseDate
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        const arrParams = [
          strResponseID,
          strAssessmentID,
          strQuestionID,
          strUserID,
          strTargetUserID,
          strResponse,
          strPublic,
          strSubmitDate
        ];
  
        db.run(strInsertSQL, arrParams, function (err) {
          if (err) {
            console.error("DB Error:", err.message);
            return res.status(400).json({ status: "error", message: err.message });
          }
  
          return res.status(201).json({
            status: "success",
            responseId: strResponseID
          });
        });
      });
    });
  });

//   function verifyToken(req, res, next) {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });
  
//     const token = authHeader.split(' ')[1];
//     if (!token) return res.status(401).json({ error: "Missing token" });
  
//     jwt.verify(token, strSecret, (err, decoded) => {
//       if (err) return res.status(401).json({ error: "Invalid or expired token" });
  
//       req.user = decoded;
//       next();
//     });
//   }
  
  app.post("/sessions", (req, res) => {
    const strEmail = req.body.email?.trim().toLowerCase();
    const strPassword = req.body.password;
  
    if (!strEmail || !strPassword) {
      return res.status(400).json({ error: "Email and password are required." });
    }
  
    const strCheckSQL = `SELECT UserID, PasswordHash FROM tblUsers WHERE Email = ?`;
  
    db.get(strCheckSQL, [strEmail], (err, row) => {
      if (err) return res.status(500).json({ error: "Database error." });
      if (!row) return res.status(401).json({ error: "Invalid email or password." });
  
      const strUserID = row.UserID;
      const strHashed = row.PasswordHash;
  
      if (!bcrypt.compareSync(strPassword, strHashed)) {
        return res.status(401).json({ error: "Invalid email or password." });
      }
  
      const strSessionID = uuidv4();
      const strStartTime = new Date().toISOString();
      const strEndTime = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(); // 12h
      const strStatus = "Active";
  
      // JWT token
      const strToken = jwt.sign(
        {
          userId: strUserID,
          sessionId: strSessionID
        },
        strSecret,
        { expiresIn: '12h' }
      );
  
      const strInsertSQL = `
        INSERT INTO tblSessions (SessionID, UserID, StartTime, EndTime, Status, SessionToken)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const arrParams = [
        strSessionID,
        strUserID,
        strStartTime,
        strEndTime,
        strStatus,
        strToken
      ];
  
      db.run(strInsertSQL, arrParams, function (err) {
        if (err) {
          console.error("DB Error:", err.message);
          return res.status(400).json({ status: "error", message: err.message });
        }
  
        return res.status(201).json({
          status: "success",
          sessionId: strSessionID,
          token: strToken,
          expiresAt: strEndTime
        });
      });
    });
  });
  
app.listen(HTTP_PORT,() => {
console.log('App listening on',HTTP_PORT)
})