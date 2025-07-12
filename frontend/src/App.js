import React, { useState } from 'react';
import './App.css';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  DollarSign,
  Calendar,
  BookOpen,
  Settings,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Package,
  Scissors,
  Shirt,
  Palette,
  Edit3,
  Printer,
  CheckCircle,
  Clock,
  Filter,
  Plus,
  Edit,
  Trash2,
  List,
  CalendarDays,
  Search,
  Bell,
  User,
  Eye,
  EyeOff
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data
const salesData = [
  { month: 'Jan', vendas: 65000, pedidos: 145 },
  { month: 'Fev', vendas: 78000, pedidos: 178 },
  { month: 'Mar', vendas: 92000, pedidos: 203 },
  { month: 'Abr', vendas: 88000, pedidos: 189 },
  { month: 'Mai', vendas: 105000, pedidos: 234 },
  { month: 'Jun', vendas: 125000, pedidos: 276 }
];

const financialData = [
  { month: 'Jan', receitas: 75000, despesas: 45000 },
  { month: 'Fev', receitas: 88000, despesas: 52000 },
  { month: 'Mar', receitas: 102000, despesas: 48000 },
  { month: 'Abr', receitas: 98000, despesas: 51000 },
  { month: 'Mai', receitas: 115000, despesas: 56000 },
  { month: 'Jun', receitas: 135000, despesas: 62000 }
];

const orderStatusData = [
  { status: 'Pedir Tecido', count: 12, color: '#ef4444' },
  { status: 'Corte', count: 8, color: '#f97316' },
  { status: 'Costura', count: 15, color: '#eab308' },
  { status: 'Silk', count: 6, color: '#06b6d4' },
  { status: 'Bordado', count: 4, color: '#8b5cf6' },
  { status: 'Sublimação', count: 3, color: '#ec4899' },
  { status: 'Fazer Layout', count: 9, color: '#84cc16' },
  { status: 'Pago', count: 18, color: '#10b981' },
  { status: 'Finalizado', count: 25, color: '#059669' }
];

const mockOrders = [
  { id: 1, cliente: 'Empresa ABC', modelo: 'Camisa Polo', quantidade: 50, cor: 'Azul', tamanhos: 'P(5), M(15), G(20), GG(10)', precoUnitario: 25.00, total: 1250.00, status: 'Costura', dataEntrega: '2025-07-15' },
  { id: 2, cliente: 'Loja XYZ', modelo: 'Camiseta Básica', quantidade: 100, cor: 'Branco', tamanhos: 'P(10), M(30), G(40), GG(20)', precoUnitario: 18.00, total: 1800.00, status: 'Silk', dataEntrega: '2025-07-20' },
  { id: 3, cliente: 'Escola São João', modelo: 'Uniforme', quantidade: 200, cor: 'Azul Marinho', tamanhos: 'PP(20), P(50), M(80), G(50)', precoUnitario: 22.00, total: 4400.00, status: 'Pedir Tecido', dataEntrega: '2025-08-01' }
];

const mockClients = [
  { id: 1, empresa: 'Empresa ABC Ltda', contato: 'João Silva', telefone: '(11) 98765-4321', endereco: 'Rua das Flores, 123 - São Paulo, SP' },
  { id: 2, empresa: 'Loja XYZ', contato: 'Maria Santos', telefone: '(11) 99876-5432', endereco: 'Av. Paulista, 456 - São Paulo, SP' },
  { id: 3, empresa: 'Escola São João', contato: 'Pedro Costa', telefone: '(11) 97654-3210', endereco: 'Rua da Escola, 789 - São Paulo, SP' }
];

const mockTransactions = [
  { id: 1, descricao: 'Venda - Empresa ABC', valor: 1250.00, tipo: 'receita', data: '2025-07-10' },
  { id: 2, descricao: 'Compra Tecido', valor: -450.00, tipo: 'despesa', data: '2025-07-09' },
  { id: 3, descricao: 'Venda - Loja XYZ', valor: 1800.00, tipo: 'receita', data: '2025-07-08' },
  { id: 4, descricao: 'Aluguel Loja', valor: -2500.00, tipo: 'despesa', data: '2025-07-05' }
];

const mockCatalogItems = [
  { id: 1, nome: 'Camisa Polo', categoria: 'Camisas', preco: 25.00, imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop' },
  { id: 2, nome: 'Camiseta Básica', categoria: 'Camisetas', preco: 18.00, imagem: 'https://images.unsplash.com/photo-1573070735055-92be4321c988?w=300&h=300&fit=crop' },
  { id: 3, nome: 'Moletom', categoria: 'Moletons', preco: 45.00, imagem: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop' },
  { id: 4, nome: 'Jaqueta', categoria: 'Jaquetas', preco: 65.00, imagem: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop' }
];

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showFilters, setShowFilters] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState('30dias');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'catalogo', label: 'Catálogo', icon: BookOpen },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  const StatusIcon = ({ status }) => {
    switch(status) {
      case 'Pedir Tecido': return <Package className="w-4 h-4" />;
      case 'Corte': return <Scissors className="w-4 h-4" />;
      case 'Costura': return <Shirt className="w-4 h-4" />;
      case 'Silk': return <Palette className="w-4 h-4" />;
      case 'Bordado': return <Edit3 className="w-4 h-4" />;
      case 'Sublimação': return <Printer className="w-4 h-4" />;
      case 'Fazer Layout': return <Edit className="w-4 h-4" />;
      case 'Pago': return <DollarSign className="w-4 h-4" />;
      case 'Finalizado': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Resumo de Vendas */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Resumo de Vendas no Mês</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Pedidos</p>
                <p className="text-2xl font-bold text-white">276</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">A Receber</p>
                <p className="text-2xl font-bold text-white">R$ 45.250</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Faturamento Total</p>
                <p className="text-2xl font-bold text-white">R$ 125.000</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="vendas" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Resumo Financeiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Receitas</p>
                <p className="text-2xl font-bold text-emerald-500">R$ 135.000</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Despesas</p>
                <p className="text-2xl font-bold text-red-500">R$ 62.000</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Saldo</p>
                <p className="text-2xl font-bold text-emerald-500">R$ 73.000</p>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }} />
              <Bar dataKey="receitas" fill="#10b981" />
              <Bar dataKey="despesas" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status dos Pedidos */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Status dos Pedidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {orderStatusData.map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <StatusIcon status={item.status} />
              </div>
              <p className="text-gray-400 text-xs mb-1">{item.status}</p>
              <p className="text-lg font-bold text-white">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPedidos = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Pedidos</h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Pedido
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">#</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Cliente</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Modelo</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Quantidade</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Valor Total</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Entrega</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-white">#{order.id}</td>
                  <td className="px-6 py-4 text-white">{order.cliente}</td>
                  <td className="px-6 py-4 text-gray-300">{order.modelo}</td>
                  <td className="px-6 py-4 text-gray-300">{order.quantidade}</td>
                  <td className="px-6 py-4 text-emerald-500 font-medium">R$ {order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{order.dataEntrega}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClientes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Clientes</h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Empresa</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Contato</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Telefone/WhatsApp</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Endereço</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client) => (
                <tr key={client.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-white font-medium">{client.empresa}</td>
                  <td className="px-6 py-4 text-gray-300">{client.contato}</td>
                  <td className="px-6 py-4 text-gray-300">{client.telefone}</td>
                  <td className="px-6 py-4 text-gray-300">{client.endereco}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFinanceiro = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Filtrar por:</h2>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Mostrar Filtros
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setFilterPeriod('7dias')}
              className={`p-3 rounded-lg transition-colors ${filterPeriod === '7dias' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Últimos 7 Dias
            </button>
            <button 
              onClick={() => setFilterPeriod('30dias')}
              className={`p-3 rounded-lg transition-colors ${filterPeriod === '30dias' ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Últimos 30 Dias
            </button>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Data Inicial</label>
              <input type="date" className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Data Final</label>
              <input type="date" className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Saldo Atual</p>
              <p className="text-2xl font-bold text-emerald-500">R$ 73.000</p>
            </div>
            <DollarSign className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receitas Totais</p>
              <p className="text-2xl font-bold text-green-500">R$ 135.000</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Despesas Totais</p>
              <p className="text-2xl font-bold text-red-500">R$ 62.000</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-500">R$ 45.250</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Fluxograma de Caixa</h3>
            <button className="text-emerald-500 hover:text-emerald-400 text-sm">Atualizar</button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="receitas" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transações Recentes</h3>
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white text-sm">{transaction.descricao}</p>
                  <p className="text-gray-400 text-xs">{transaction.data}</p>
                </div>
                <p className={`font-medium ${transaction.tipo === 'receita' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.tipo === 'receita' ? '+' : ''}R$ {Math.abs(transaction.valor).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgenda = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Agenda</h2>
        <div className="flex gap-2">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <List className="w-4 h-4" />
            Lista
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <CalendarDays className="w-4 h-4" />
            Calendário
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <button className="bg-emerald-500/20 text-emerald-400 p-3 rounded-lg text-center">
            <p className="text-sm">Pedidos Concluídos</p>
            <p className="text-lg font-bold">25</p>
          </button>
          <button className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">
            <p className="text-sm">Pedidos Atrasados</p>
            <p className="text-lg font-bold">3</p>
          </button>
          <button className="bg-green-500/20 text-green-400 p-3 rounded-lg text-center">
            <p className="text-sm">Pedidos Entregues</p>
            <p className="text-lg font-bold">22</p>
          </button>
          <button className="bg-yellow-500/20 text-yellow-400 p-3 rounded-lg text-center">
            <p className="text-sm">Próximas Entregas</p>
            <p className="text-lg font-bold">8</p>
          </button>
        </div>

        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">{order.cliente} - {order.modelo}</p>
                <p className="text-gray-400 text-sm">Quantidade: {order.quantidade} | Status: {order.status}</p>
              </div>
              <div className="text-right">
                <p className="text-white">Entrega: {order.dataEntrega}</p>
                <p className="text-emerald-500 font-medium">R$ {order.total.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCatalogo = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Catálogo</h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Buscar produtos..." 
            className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-emerald-500 focus:outline-none"
          />
        </div>
        <select className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-600">
          <option>Todas as categorias</option>
          <option>Camisas</option>
          <option>Camisetas</option>
          <option>Moletons</option>
          <option>Jaquetas</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockCatalogItems.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors">
            <img src={item.imagem} alt={item.nome} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-white font-medium mb-1">{item.nome}</h3>
              <p className="text-gray-400 text-sm mb-2">{item.categoria}</p>
              <p className="text-emerald-500 font-bold text-lg">R$ {item.preco.toFixed(2)}</p>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm transition-colors">
                  Editar
                </button>
                <button className="text-red-400 hover:text-red-300 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConfiguracoes = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Configurações</h2>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Informações da Empresa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Nome da Empresa</label>
            <input 
              type="text" 
              defaultValue="Ideal Silk Screen"
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Telefone</label>
            <input 
              type="text" 
              defaultValue="(11) 99999-9999"
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">País</label>
            <select className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600 focus:border-emerald-500 focus:outline-none">
              <option>Brasil</option>
              <option>Argentina</option>
              <option>Chile</option>
            </select>
          </div>
        </div>
        <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors">
          Salvar Informações
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Alterar Senha</h3>
        <div className="space-y-4 max-w-md">
          <div className="relative">
            <label className="block text-gray-400 text-sm mb-1">Nova Senha</label>
            <input 
              type={showPassword ? "text" : "password"}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 pr-10 border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="relative">
            <label className="block text-gray-400 text-sm mb-1">Confirmar Nova Senha</label>
            <input 
              type={showConfirmPassword ? "text" : "password"}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 pr-10 border border-gray-600 focus:border-emerald-500 focus:outline-none"
            />
            <button 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <button className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors">
          Alterar Senha
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Suporte</h3>
        <p className="text-gray-400 mb-2">Para suporte técnico, entre em contato:</p>
        <p className="text-emerald-500">contato@idealsilkscreen.com.br</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard': return renderDashboard();
      case 'pedidos': return renderPedidos();
      case 'clientes': return renderClientes();
      case 'financeiro': return renderFinanceiro();
      case 'agenda': return renderAgenda();
      case 'catalogo': return renderCatalogo();
      case 'configuracoes': return renderConfiguracoes();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IS</span>
            </div>
            <span className="text-white font-semibold">Ideal SilkScreen</span>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-emerald-500 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-white capitalize">{activeMenu}</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 text-sm border border-gray-600 focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <button className="relative text-gray-400 hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-white text-sm">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;