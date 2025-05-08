# Importando bibliotecas principais
import pandas as pd
import plotly.express as px
from dash import Dash, html, dcc

# 🔽 Lê os dados do arquivo CSV
df = pd.read_csv('dados.csv')

# 🔢 Cria uma nova coluna com o valor total da venda
df['total'] = df['quantidade'] * df['valor']

# 🎨 Criação do app Dash
app = Dash(__name__)

# 📈 Gráfico de vendas por produto
grafico_produtos = px.bar(
    df.groupby('produto')['total'].sum().reset_index(),
    x='produto',
    y='total',
    title='Total de Vendas por Produto',
    color='produto',
    color_discrete_sequence=px.colors.qualitative.Pastel
)

# 📈 Gráfico de vendas por vendedor
grafico_vendedor = px.pie(
    df,
    names='vendedor',
    values='total',
    title='Participação de Vendas por Vendedor',
    color_discrete_sequence=px.colors.sequential.Agsunset
)

# 💻 Layout da aplicação
app.layout = html.Div(style={
    'fontFamily': 'Arial',
    'backgroundColor': '#F4F4F4',
    'padding': '20px'
}, children=[
    html.H1('Dashboard - Loja de Móveis', style={'textAlign': 'center', 'color': '#333'}),
    
    html.Div(children=[
        dcc.Graph(figure=grafico_produtos),
        dcc.Graph(figure=grafico_vendedor)
    ], style={'display': 'flex', 'justifyContent': 'space-around'})
])

# 🚀 Executa o servidor local
if __name__ == '__main__':
    app.run(debug=True)
