from flask import Flask, render_template, jsonify, request
import psycopg2
import psycopg2.extras


app = Flask(__name__)

def conexion():
    return psycopg2.connect(
        host = "localhost",
        user = "postgres",
        password = "Andromeda123?",
        database = "BD_proyecto_parcial"
    )

@app.route('/')

def index():
    return render_template('index.html')

@app.route("/municipios")
def municipios():
    conn = conexion()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT municipio FROM municipios;")
    datos = [m[0] for m in cursor.fetchall()]
    conn.close()
    return jsonify(datos)

@app.route("/asuntos")
def asuntos():
    conn = conexion()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT asunto FROM asuntos;")
    datos = [a[0] for a in cursor.fetchall()]
    conn.close()
    return jsonify(datos)

@app.route("/niveles")
def niveles():
    conn = conexion()
    cursor = conn.cursor()
    cursor.execute("SELECT DISTINCT nivel FROM nivel;")
    datos = [n[0] for n in cursor.fetchall()]
    conn.close()
    return jsonify(datos)

@app.route ("/turno", methods = ["POST"])
def crear_turno ():
    data = request.get_json()
    nombre_comp = data.get("nombre_comp")
    curp = data.get("curp")
    nombre = data.get("nombre")
    paterno = data.get("paterno")
    materno = data.get("materno")
    telefono = data.get("telefono")
    celular = data.get("celular")
    correo = data.get("correo")
    id_nivel = data.get("id_nivel")
    id_municipio = data.get("id_municipio")
    id_asunto = data.get("id_asunto")
    id_estatus = 1

    conn = conexion()
    cursor = conn.cursor()
    cursor.execute("""
            INSERT INTO turno (nombre_comp, curp, nombre, paterno, materno, telefono, celular, correo, id_nivel, id_municipio, id_asunto, id_estatus)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, (nombre_comp,curp,nombre,paterno,materno,telefono,celular,correo,id_nivel,id_municipio,id_asunto,id_estatus))
    conn.commit()
    conn.close()

    return jsonify({"mensaje": "nivel creado exitosamente"}), 201
    




if __name__ == '__main__':
    app.run(debug=True, port=5001)