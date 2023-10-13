from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template("homepage.html")

@app.route("/sobre")
def sobre():
    return render_template("sobre.html")

### Temporariamente desativado a main devido a MVP
#@app.route("/usuarios/<nome_usuario>")
#def usuarios(nome_usuario):
#    return render_template("usuarios.html", nome_usuario=nome_usuario)


if __name__ == "__main__":
    app.run(debug=True)