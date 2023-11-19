from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("main.html")

@app.route("/sobre")
def sobre():
    return render_template("sobre.html")
    
@app.route("/contato")
def contato():
    return render_template("contato.html")
    
@app.route("/obrigado")
def obrigado():
    return render_template("obrigado.html")

if __name__ == "__main__":
    app.run(debug=True)