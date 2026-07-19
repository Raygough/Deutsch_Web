import sqlite3

def init_db():
    connection = sqlite3.connect("sessions.db")
    cur = connection.cursor()

    cur.execute("CREATE TABLE IF NOT EXISTS " \
    "session(num_questions INTEGER, " \
    "category TEXT, " \
    "session_length INTEGER," \
    "session_date_time TEXT, " \
    "num_correct INTEGER, " \
    "session_accuracy REAL)")

    connection.commit()
    connection.close()

def save_session(num_questions, category, session_length, session_date_time, num_correct, session_accuracy):
    connection = sqlite3.connect("sessions.db")
    cur = connection.cursor()

    session_data = (num_questions, category, session_length, session_date_time, num_correct, session_accuracy)
    cur.execute(
        """
        INSERT INTO session (num_questions, category, session_length, session_date_time, num_correct, session_accuracy)
        VALUES (?, ?, ?, ?, ?, ?)
        """, session_data)

    connection.commit()
    connection.close()