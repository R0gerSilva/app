import React, { useState, useRef } from 'react';
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
  EyeOff,
  Upload,
  X,
  Save,
  Copy,
  Grid3X3,
  BarChart3,
  ShoppingCart,
  RefreshCw,
  AlertTriangle,
  CheckSquare,
  Star,
  Heart,
  Share2,
  Download,
  FileText,
  Camera,
  Tags,
  Zap,
  Target,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock data expandido
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

// Dados mais realistas baseados no arquivo original
const mockProducts = [
  { id: 1, nome: 'Camiseta Tradicional', categoria: 'Camisetas', preco: 25.00, estoque: 45, vendidos: 120, imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', codigo: 'CT001', custo: 15.00 },
  { id: 2, nome: 'Baby Look', categoria: 'Camisetas', preco: 23.00, estoque: 2, vendidos: 200, imagem: 'https://images.unsplash.com/photo-1573070735055-92be4321c988?w=300&h=300&fit=crop', codigo: 'BL001', custo: 14.00 },
  { id: 3, nome: 'Moletom com Capuz', categoria: 'Moletons', preco: 45.00, estoque: 25, vendidos: 80, imagem: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop', codigo: 'ML001', custo: 28.00 },
  { id: 4, nome: 'Polo', categoria: 'Polos', preco: 35.00, estoque: 1, vendidos: 45, imagem: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop', codigo: 'PL001', custo: 22.00 },
  { id: 5, nome: 'Calça de Brim', categoria: 'Calças', preco: 55.00, estoque: 15, vendidos: 30, imagem: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop', codigo: 'CB001', custo: 35.00 }
];

const mockCategories = [
  { id: 1, nome: 'Camisetas', produtos: 18, cor: '#10b981' },
  { id: 2, nome: 'Moletons', produtos: 8, cor: '#06b6d4' },
  { id: 3, nome: 'Polos', produtos: 12, cor: '#8b5cf6' },
  { id: 4, nome: 'Calças', produtos: 6, cor: '#f59e0b' },
  { id: 5, nome: 'Infantil', produtos: 15, cor: '#ef4444' }
];

// Dados adaptados do arquivo original
const modelos = ['Camiseta Tradicional', 'Baby Look', 'Infantil', 'Calça de Brim', 'Moletom', 'Polo'];
const tecidos = ['PV', 'Algodão', 'Dryfit', 'Piquet'];
const personalizacoes = ['Silk Screen', 'Sublimação Total', 'Bordado'];
const posicoes = ['Frente', 'Costas', 'Manga Esquerda', 'Manga Direita', 'Lateral Esquerda', 'Lateral Direita', 'Barra'];
const statusOptions = ['Fazer Mockup', 'Aguardando Cliente', 'Aprovado', 'Pedir tecido', 'Cortar', 'Costurar', 'Bordar', 'Silkar', 'Sublimar', 'Concluído', 'Entregue', 'Pago'];

// Tamanhos específicos por categoria (do arquivo original)
const tamanhosPorCategoria = {
  'Infantil': ['01', '02', '04', '06', '08', '10', '12', '14'],
  'Baby Look': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida'],
  'Camiseta Tradicional': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida'],
  'Calça de Brim': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida'],
  'Moletom': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida'],
  'Polo': ['PP', 'P', 'M', 'G', 'GG', 'EGG', 'EGG1', 'EGG2', 'Sob Medida']
};

// Tamanhos que têm valor adicional
const tamanhosComValorAdicional = ['EGG', 'EGG1', 'EGG2', 'Sob Medida'];

const mockOrders = [
  { 
    id: 1, 
    cliente: 'Empresa ABC', 
    cliente_empresa: 'Empresa ABC Ltda',
    modelo: 'Camiseta Tradicional', 
    quantidade: 50, 
    cor: 'Azul', 
    tamanhos: {P: 5, M: 15, G: 20, GG: 10}, 
    precoUnitario: 25.00, 
    total: 1250.00, 
    valor_total: 1250.00,
    entrada_paga: 625.00,
    saldo_restante: 625.00,
    status: 'Costura', 
    dataEntrega: '2025-07-15', 
    dataPedido: '2025-07-01',
    itens: [{
      modelo: 'Camiseta Tradicional',
      tecido: 'PV',
      cor: 'Azul',
      tamanhos: {P: 5, M: 15, G: 20, GG: 10},
      personalizacao: 'Silk Screen',
      posicoes: ['Frente', 'Costas'],
      valor_unitario: 25.00,
      quantidade_total: 50
    }],
    observacoes: 'Pedido para evento corporativo'
  },
  { 
    id: 2, 
    cliente: 'Loja XYZ', 
    cliente_empresa: 'Loja XYZ',
    modelo: 'Baby Look', 
    quantidade: 100, 
    cor: 'Branco', 
    tamanhos: {P: 10, M: 30, G: 40, GG: 20}, 
    precoUnitario: 23.00, 
    total: 2300.00, 
    valor_total: 2300.00,
    entrada_paga: 1150.00,
    saldo_restante: 1150.00,
    status: 'Silk', 
    dataEntrega: '2025-07-20', 
    dataPedido: '2025-07-02',
    itens: [{
      modelo: 'Baby Look',
      tecido: 'Algodão',
      cor: 'Branco',
      tamanhos: {P: 10, M: 30, G: 40, GG: 20},
      personalizacao: 'Sublimação Total',
      posicoes: ['Frente'],
      valor_unitario: 23.00,
      quantidade_total: 100
    }]
  }
];

const mockClients = [
  { 
    id: 1, 
    empresa: 'Empresa ABC Ltda', 
    contato: 'João Silva', 
    telefone: '(11) 98765-4321', 
    endereco: 'Rua das Flores, 123 - São Paulo, SP',
    email: 'joao@empresaabc.com',
    totalCompras: 15250.00,
    ultimaCompra: '2025-07-10',
    pedidosTotal: 8
  },
  { 
    id: 2, 
    empresa: 'Loja XYZ', 
    contato: 'Maria Santos', 
    telefone: '(11) 99876-5432', 
    endereco: 'Av. Paulista, 456 - São Paulo, SP',
    email: 'maria@lojaxyz.com',
    totalCompras: 8900.00,
    ultimaCompra: '2025-07-08',
    pedidosTotal: 5
  },
  { 
    id: 3, 
    empresa: 'Escola São João', 
    contato: 'Pedro Costa', 
    telefone: '(11) 97654-3210', 
    endereco: 'Rua da Escola, 789 - São Paulo, SP',
    email: 'pedro@escolasaojoao.edu.br',
    totalCompras: 22300.00,
    ultimaCompra: '2025-07-03',
    pedidosTotal: 12
  }
];

let mockTransactions = [
  { id: 1, descricao: 'Venda - Empresa ABC', valor: 1250.00, tipo: 'receita', data: '2025-07-10', categoria: 'Vendas' },
  { id: 2, descricao: 'Compra Tecido', valor: -450.00, tipo: 'despesa', data: '2025-07-09', categoria: 'Materiais' },
  { id: 3, descricao: 'Venda - Loja XYZ', valor: 1800.00, tipo: 'receita', data: '2025-07-08', categoria: 'Vendas' },
  { id: 4, descricao: 'Aluguel Loja', valor: -2500.00, tipo: 'despesa', data: '2025-07-05', categoria: 'Fixos' },
  { id: 5, descricao: 'Energia Elétrica', valor: -320.00, tipo: 'despesa', data: '2025-07-04', categoria: 'Fixos' },
  { id: 6, descricao: 'Venda - Escola São João', valor: 4400.00, tipo: 'receita', data: '2025-07-03', categoria: 'Vendas' }
];

let mockAgenda = [
  { id: 1, titulo: 'Entrega - Empresa ABC', data: '2025-07-15', hora: '14:00', tipo: 'entrega', cliente: 'Empresa ABC', status: 'pendente' },
  { id: 2, titulo: 'Reunião - Novo Cliente', data: '2025-07-16', hora: '10:30', tipo: 'reuniao', cliente: 'Cliente Potencial', status: 'confirmado' },
  { id: 3, titulo: 'Produção - Pedido 150 peças', data: '2025-07-17', hora: '08:00', tipo: 'producao', cliente: 'Loja XYZ', status: 'pendente' },
  { id: 4, titulo: 'Aniversário - Maria Santos', data: '2025-07-20', hora: '00:00', tipo: 'aniversario', cliente: 'Maria Santos', status: 'lembrete' }
];

// Arrays para controlar dados localmente
let localClients = [...mockClients];
let localOrders = [...mockOrders];
let localProducts = [...mockProducts];
let localCategories = [...mockCategories];

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showFilters, setShowFilters] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState('30dias');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [catalogConfig, setCatalogConfig] = useState({
    ativo: true,
    nome: 'Ideal SilkScreen',
    descricao: 'Serigrafia e bordados personalizados',
    endereco: 'idealsilkscreen',
    telefone: '(11) 99999-9999',
    corPrincipal: '#10b981',
    corTexto: '#ffffff'
  });
  const [agendaView, setAgendaView] = useState('hoje');
  const [agendaViewType, setAgendaViewType] = useState('lista');
  const [editingClient, setEditingClient] = useState(null);
  const [loading, setLoading] = useState(false);

  // Estados para formulários (baseados no arquivo original)
  const [novoCliente, setNovoCliente] = useState({
    empresa: '',
    contato: '',
    telefone: '',
    endereco: ''
  });

  const [novoPedido, setNovoPedido] = useState({
    cliente_id: '',
    cliente_empresa: '',
    itens: [{
      modelo: '',
      tecido: '',
      cor: '',
      tamanhos: {},
      personalizacao: '',
      posicoes: [],
      valor_unitario: 0,
      quantidade_total: 0,
      valor_adicional: 0
    }],
    previsao_entrega: '',
    observacoes: '',
    layout_images: []
  });

  const [buscaCliente, setBuscaCliente] = useState('');
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [mostrarFormularioCliente, setMostrarFormularioCliente] = useState(false);

  // Novos estados para dados locais
  const [clients, setClients] = useState(localClients);
  const [orders, setOrders] = useState(localOrders);
  const [products, setProducts] = useState(localProducts);
  const [categories, setCategories] = useState(localCategories);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [agenda, setAgenda] = useState(mockAgenda);
  
  const fileInputRef = useRef(null);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pedidos', label: 'Pedidos', icon: ShoppingBag },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'catalogo', label: 'Catálogo', icon: BookOpen },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  // Função para calcular valor com adicional (do arquivo original)
  const calcularValorComAdicional = (valorUnitario, tamanhos) => {
    let valorTotal = 0;
    let quantidadeTotal = 0;
    let valorAdicional = 0;
    
    Object.entries(tamanhos || {}).forEach(([tamanho, qtd]) => {
      const quantidade = parseInt(qtd) || 0;
      if (quantidade > 0) {
        quantidadeTotal += quantidade;
        
        if (tamanhosComValorAdicional.includes(tamanho)) {
          const valorComAdicional = valorUnitario + 5.00;
          valorTotal += quantidade * valorComAdicional;
          valorAdicional += quantidade * 5.00;
        } else {
          valorTotal += quantidade * valorUnitario;
        }
      }
    });
    
    return { valorTotal, quantidadeTotal, valorAdicional };
  };

  // Função para calcular quantidade total
  const calcularQuantidadeTotal = (tamanhos) => {
    return Object.values(tamanhos).reduce((total, qtd) => total + (parseInt(qtd) || 0), 0);
  };

  // Função para upload da logo
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target.result);
        localStorage.setItem('logoEmpresa', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Carregar logo do localStorage
  useState(() => {
    const logoSalva = localStorage.getItem('logoEmpresa');
    if (logoSalva) {
      setLogoUrl(logoSalva);
    }
  }, []);

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    // Reset form states
    setNovoCliente({ empresa: '', contato: '', telefone: '', endereco: '' });
    setNovoPedido({
      cliente_id: '',
      cliente_empresa: '',
      itens: [{
        modelo: '',
        tecido: '',
        cor: '',
        tamanhos: {},
        personalizacao: '',
        posicoes: [],
        valor_unitario: 0,
        quantidade_total: 0,
        valor_adicional: 0
      }],
      previsao_entrega: '',
      observacoes: '',
      layout_images: []
    });
    setBuscaCliente('');
    setClientesFiltrados([]);
    setMostrarFormularioCliente(false);
  };

  // FUNÇÕES PARA CLIENTES (adaptadas do arquivo original)
  const criarCliente = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const novoClienteData = {
        id: Date.now(),
        ...novoCliente,
        email: `${novoCliente.contato.toLowerCase().replace(' ', '.')}@${novoCliente.empresa.toLowerCase().replace(' ', '')}.com`,
        totalCompras: 0,
        ultimaCompra: null,
        pedidosTotal: 0
      };
      
      const updatedClients = [...clients, novoClienteData];
      setClients(updatedClients);
      localClients = updatedClients;
      
      setNovoCliente({ empresa: '', contato: '', telefone: '', endereco: '' });
      closeModal();
      alert('Cliente criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      alert('Erro ao criar cliente');
    } finally {
      setLoading(false);
    }
  };

  const excluirCliente = (clienteId, empresaCliente) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente "${empresaCliente}"?`)) {
      const updatedClients = clients.filter(c => c.id !== clienteId);
      setClients(updatedClients);
      localClients = updatedClients;
      alert('Cliente excluído com sucesso!');
    }
  };

  const iniciarEdicaoCliente = (cliente) => {
    setEditingClient(cliente.id);
    setNovoCliente({
      empresa: cliente.empresa,
      contato: cliente.contato,
      telefone: cliente.telefone,
      endereco: cliente.endereco
    });
  };

  const salvarEdicaoCliente = () => {
    const updatedClients = clients.map(c => 
      c.id === editingClient 
        ? { ...c, ...novoCliente }
        : c
    );
    setClients(updatedClients);
    localClients = updatedClients;
    setEditingClient(null);
    setNovoCliente({ empresa: '', contato: '', telefone: '', endereco: '' });
    alert('Cliente atualizado com sucesso!');
  };

  const cancelarEdicaoCliente = () => {
    setEditingClient(null);
    setNovoCliente({ empresa: '', contato: '', telefone: '', endereco: '' });
  };

  // FUNÇÕES PARA PEDIDOS (adaptadas do arquivo original)
  const filtrarClientes = (busca) => {
    if (!busca) {
      setClientesFiltrados([]);
      return;
    }
    
    const filtrados = clients.filter(cliente => 
      cliente.empresa.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.contato.toLowerCase().includes(busca.toLowerCase())
    );
    setClientesFiltrados(filtrados);
  };

  const selecionarCliente = (cliente) => {
    setNovoPedido({
      ...novoPedido,
      cliente_id: cliente.id,
      cliente_empresa: cliente.empresa
    });
    setBuscaCliente(cliente.empresa);
    setClientesFiltrados([]);
  };

  const buscarCliente = (valor) => {
    setBuscaCliente(valor);
    if (valor.length > 0) {
      filtrarClientes(valor);
    } else {
      setClientesFiltrados([]);
      setNovoPedido({
        ...novoPedido,
        cliente_id: '',
        cliente_empresa: ''
      });
    }
  };

  const atualizarItemPedido = (index, field, value) => {
    const novosItens = [...novoPedido.itens];
    novosItens[index][field] = value;
    
    if (field === 'tamanhos') {
      novosItens[index].quantidade_total = calcularQuantidadeTotal(value);
    }
    
    if (field === 'modelo') {
      novosItens[index].tamanhos = {};
      novosItens[index].quantidade_total = 0;
    }
    
    setNovoPedido({ ...novoPedido, itens: novosItens });
  };

  const atualizarTamanho = (itemIndex, tamanho, quantidade) => {
    const novosItens = [...novoPedido.itens];
    novosItens[itemIndex].tamanhos[tamanho] = quantidade;
    novosItens[itemIndex].quantidade_total = calcularQuantidadeTotal(novosItens[itemIndex].tamanhos);
    setNovoPedido({ ...novoPedido, itens: novosItens });
  };

  const adicionarItemPedido = () => {
    setNovoPedido({
      ...novoPedido,
      itens: [...novoPedido.itens, {
        modelo: '',
        tecido: '',
        cor: '',
        tamanhos: {},
        personalizacao: '',
        posicoes: [],
        valor_unitario: 0,
        quantidade_total: 0,
        valor_adicional: 0
      }]
    });
  };

  const removerItemPedido = (index) => {
    const novosItens = novoPedido.itens.filter((_, i) => i !== index);
    setNovoPedido({ ...novoPedido, itens: novosItens });
  };

  const calcularValorTotalPedido = () => {
    return novoPedido.itens.reduce((total, item) => {
      const { valorTotal: valorItem } = calcularValorComAdicional(
        parseFloat(item.valor_unitario) || 0,
        item.tamanhos
      );
      return total + valorItem;
    }, 0);
  };

  const handleMultipleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('Máximo de 5 imagens permitidas');
      return;
    }

    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setNovoPedido({
        ...novoPedido,
        layout_images: [...(novoPedido.layout_images || []), ...images].slice(0, 5)
      });
    });
  };

  const removerImagem = (index) => {
    const novasImages = novoPedido.layout_images.filter((_, i) => i !== index);
    setNovoPedido({...novoPedido, layout_images: novasImages});
  };

  const criarPedido = (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const valorTotal = calcularValorTotalPedido();
      const entradaPaga = valorTotal * 0.5; // 50% de entrada
      const saldoRestante = valorTotal - entradaPaga;
      
      const novoPedidoData = {
        id: Date.now(),
        cliente: novoPedido.cliente_empresa,
        cliente_empresa: novoPedido.cliente_empresa,
        valor_total: valorTotal,
        entrada_paga: entradaPaga,
        saldo_restante: saldoRestante,
        status: 'Fazer Mockup',
        dataEntrega: novoPedido.previsao_entrega,
        dataPedido: new Date().toISOString().split('T')[0],
        itens: novoPedido.itens,
        observacoes: novoPedido.observacoes,
        layout_images: novoPedido.layout_images || []
      };
      
      const updatedOrders = [...orders, novoPedidoData];
      setOrders(updatedOrders);
      localOrders = updatedOrders;
      
      alert('Pedido criado com sucesso!');
      closeModal();
      setActiveMenu('pedidos');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao criar pedido');
    } finally {
      setLoading(false);
    }
  };

  // FUNÇÕES PARA TRANSAÇÕES FINANCEIRAS
  const adicionarTransacao = (tipo, dados) => {
    const novaTransacao = {
      id: Date.now(),
      tipo: tipo,
      data: new Date().toISOString().split('T')[0],
      ...dados
    };
    
    const updatedTransactions = [...transactions, novaTransacao];
    setTransactions(updatedTransactions);
    mockTransactions = updatedTransactions;
    
    alert(`${tipo === 'receita' ? 'Receita' : 'Despesa'} adicionada com sucesso!`);
    closeModal();
  };

  // FUNÇÕES PARA AGENDA
  const adicionarCompromisso = (dados) => {
    const novoCompromisso = {
      id: Date.now(),
      ...dados,
      status: 'pendente'
    };
    
    const updatedAgenda = [...agenda, novoCompromisso];
    setAgenda(updatedAgenda);
    mockAgenda = updatedAgenda;
    
    alert('Compromisso adicionado com sucesso!');
    closeModal();
  };

  // Filtrar agenda baseado na visualização
  const filtrarAgenda = () => {
    const hoje = new Date();
    const inicioSemana = new Date(hoje);
    inicioSemana.setDate(hoje.getDate() - hoje.getDay());
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(inicioSemana.getDate() + 6);
    
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    return agenda.filter(item => {
      const dataItem = new Date(item.data);
      
      switch(agendaView) {
        case 'hoje':
          return dataItem.toDateString() === hoje.toDateString();
        case 'semana':
          return dataItem >= inicioSemana && dataItem <= fimSemana;
        case 'mes':
          return dataItem >= inicioMes && dataItem <= fimMes;
        case 'aniversarios':
          return item.tipo === 'aniversario';
        default:
          return true;
      }
    });
  };

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

  const Modal = ({ children }) => {
    if (!showModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">
              {modalType === 'produto' && 'Novo Produto'}
              {modalType === 'categoria' && 'Nova Categoria'}
              {modalType === 'pedido' && 'Novo Pedido'}
              {modalType === 'cliente' && 'Novo Cliente'}
              {modalType === 'receita' && 'Nova Receita'}
              {modalType === 'despesa' && 'Nova Despesa'}
              {modalType === 'compromisso' && 'Novo Compromisso'}
            </h3>
            <button onClick={closeModal} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // FORMULÁRIOS DOS MODAIS
  const PedidoForm = () => (
    <form onSubmit={criarPedido} className="space-y-6">
      {/* Seleção de Cliente */}
      <div>
        <label className="block text-gray-300 text-sm mb-2">Cliente *</label>
        <div className="relative">
          <input
            type="text"
            value={buscaCliente}
            onChange={(e) => buscarCliente(e.target.value)}
            placeholder="Digite o nome da empresa ou contato..."
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
            required
          />
          
          {clientesFiltrados.length > 0 && buscaCliente && (
            <div className="absolute z-10 w-full bg-gray-700 border border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto">
              {clientesFiltrados.map((cliente) => (
                <button
                  key={cliente.id}
                  type="button"
                  onClick={() => selecionarCliente(cliente)}
                  className="w-full p-3 text-left border-b border-gray-600 hover:bg-gray-600 text-white"
                >
                  <div className="font-medium">{cliente.empresa}</div>
                  <div className="text-sm text-gray-400">{cliente.contato} - {cliente.telefone}</div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-2 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setMostrarFormularioCliente(!mostrarFormularioCliente)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 text-sm"
          >
            {mostrarFormularioCliente ? 'Cancelar' : 'Novo Cliente'}
          </button>
          {novoPedido.cliente_empresa && (
            <span className="text-sm text-green-400">
              ✓ Cliente selecionado: {novoPedido.cliente_empresa}
            </span>
          )}
        </div>
      </div>

      {/* Formulário para novo cliente */}
      {mostrarFormularioCliente && (
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
          <h4 className="font-semibold text-white mb-3">Cadastrar Novo Cliente</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Empresa *</label>
              <input
                type="text"
                value={novoCliente.empresa}
                onChange={(e) => setNovoCliente({...novoCliente, empresa: e.target.value})}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Contato *</label>
              <input
                type="text"
                value={novoCliente.contato}
                onChange={(e) => setNovoCliente({...novoCliente, contato: e.target.value})}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Telefone *</label>
              <input
                type="text"
                value={novoCliente.telefone}
                onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Endereço *</label>
              <input
                type="text"
                value={novoCliente.endereco}
                onChange={(e) => setNovoCliente({...novoCliente, endereco: e.target.value})}
                className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              onClick={async () => {
                try {
                  const clienteData = {
                    id: Date.now(),
                    ...novoCliente,
                    email: `${novoCliente.contato.toLowerCase().replace(' ', '.')}@${novoCliente.empresa.toLowerCase().replace(' ', '')}.com`,
                    totalCompras: 0,
                    ultimaCompra: null,
                    pedidosTotal: 0
                  };
                  
                  const updatedClients = [...clients, clienteData];
                  setClients(updatedClients);
                  localClients = updatedClients;
                  
                  setNovoPedido({
                    ...novoPedido,
                    cliente_id: clienteData.id,
                    cliente_empresa: novoCliente.empresa
                  });
                  setBuscaCliente(novoCliente.empresa);
                  setMostrarFormularioCliente(false);
                  setNovoCliente({ empresa: '', contato: '', telefone: '', endereco: '' });
                  alert('Cliente criado e selecionado com sucesso!');
                } catch (error) {
                  alert('Erro ao criar cliente');
                }
              }}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md"
            >
              Salvar Cliente
            </button>
          </div>
        </div>
      )}

      {/* Upload de imagens de layout */}
      <div>
        <label className="block text-gray-300 text-sm mb-2">Imagens de Layout (até 5 imagens)</label>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultipleImageUpload}
            className="w-full text-white"
          />
          <p className="text-xs text-gray-400 mt-2">
            Máximo 5 imagens. Formatos: PNG, JPG, JPEG
          </p>
        </div>
        
        {novoPedido.layout_images && novoPedido.layout_images.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-300 mb-2">
              Preview das Imagens ({novoPedido.layout_images.length}/5):
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {novoPedido.layout_images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Layout ${index + 1}`}
                    className="w-full h-20 object-cover border border-gray-500 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removerImagem(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Itens do pedido */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-white">Itens do Pedido</h4>
          <button
            type="button"
            onClick={adicionarItemPedido}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            + Adicionar Item
          </button>
        </div>

        {novoPedido.itens.map((item, itemIndex) => (
          <div key={itemIndex} className="bg-gray-700 rounded-lg p-4 mb-4 border border-gray-600">
            <div className="flex justify-between items-center mb-4">
              <h5 className="font-semibold text-white">Item {itemIndex + 1}</h5>
              {novoPedido.itens.length > 1 && (
                <button
                  type="button"
                  onClick={() => removerItemPedido(itemIndex)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remover
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Modelo *</label>
                <select
                  value={item.modelo}
                  onChange={(e) => atualizarItemPedido(itemIndex, 'modelo', e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                  required
                >
                  <option value="">Selecione...</option>
                  {modelos.map(modelo => (
                    <option key={modelo} value={modelo}>{modelo}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tecido *</label>
                <select
                  value={item.tecido}
                  onChange={(e) => atualizarItemPedido(itemIndex, 'tecido', e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                  required
                >
                  <option value="">Selecione...</option>
                  {tecidos.map(tecido => (
                    <option key={tecido} value={tecido}>{tecido}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Cor *</label>
                <input
                  type="text"
                  value={item.cor}
                  onChange={(e) => atualizarItemPedido(itemIndex, 'cor', e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Personalização *</label>
                <select
                  value={item.personalizacao}
                  onChange={(e) => atualizarItemPedido(itemIndex, 'personalizacao', e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                  required
                >
                  <option value="">Selecione...</option>
                  {personalizacoes.map(pers => (
                    <option key={pers} value={pers}>{pers}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Valor Unitário (R$) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={item.valor_unitario}
                  onChange={(e) => atualizarItemPedido(itemIndex, 'valor_unitario', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">*EGG, EGG1, EGG2, Sob Medida: +R$ 5,00</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Quantidade Total</label>
                <input
                  type="number"
                  value={item.quantidade_total}
                  readOnly
                  className="w-full p-2 bg-gray-800 border border-gray-500 rounded-md text-gray-400"
                />
              </div>
            </div>

            {/* Tamanhos específicos por categoria */}
            {item.modelo && tamanhosPorCategoria[item.modelo] && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tamanhos e Quantidades - {item.modelo}
                </label>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {tamanhosPorCategoria[item.modelo].map(tamanho => (
                    <div key={tamanho} className="text-center">
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        {tamanho}
                        {tamanhosComValorAdicional.includes(tamanho) && (
                          <span className="text-green-400">*</span>
                        )}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={item.tamanhos[tamanho] || 0}
                        onChange={(e) => atualizarTamanho(itemIndex, tamanho, parseInt(e.target.value) || 0)}
                        className="w-full p-1 bg-gray-600 border border-gray-500 rounded-md text-white text-sm text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posições */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Posições da Personalização
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {posicoes.map(posicao => (
                  <label key={posicao} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={item.posicoes.includes(posicao)}
                      onChange={(e) => {
                        const novasPos = e.target.checked
                          ? [...item.posicoes, posicao]
                          : item.posicoes.filter(p => p !== posicao);
                        atualizarItemPedido(itemIndex, 'posicoes', novasPos);
                      }}
                      className="rounded border-gray-500"
                    />
                    <span className="text-sm text-gray-300">{posicao}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Valor total do item */}
            <div className="mt-4 p-3 bg-gray-600 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-300">Valor Total do Item:</span>
                <span className="text-lg font-bold text-white">
                  R$ {calcularValorComAdicional(
                    parseFloat(item.valor_unitario) || 0,
                    item.tamanhos
                  ).valorTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Valor total do pedido */}
      <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
        <div className="text-center">
          <div className="text-xl font-bold text-white mb-4">VALOR TOTAL DO PEDIDO</div>
          <div className="text-3xl font-bold text-green-400 mb-4">
            R$ {calcularValorTotalPedido().toFixed(2)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900 p-4 rounded-lg">
              <div className="font-medium text-green-300">Entrada (50%)</div>
              <div className="text-xl font-bold text-green-400">
                R$ {(calcularValorTotalPedido() * 0.5).toFixed(2)}
              </div>
            </div>
            <div className="bg-orange-900 p-4 rounded-lg">
              <div className="font-medium text-orange-300">A Receber</div>
              <div className="text-xl font-bold text-orange-400">
                R$ {(calcularValorTotalPedido() * 0.5).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">Previsão de Entrega</label>
          <input
            type="date"
            value={novoPedido.previsao_entrega}
            onChange={(e) => setNovoPedido({...novoPedido, previsao_entrega: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-1">Observações</label>
          <textarea
            value={novoPedido.observacoes}
            onChange={(e) => setNovoPedido({...novoPedido, observacoes: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
            rows="3"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading || !novoPedido.cliente_id}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Criando Pedido...' : 'Criar Pedido'}
        </button>
        <button type="button" onClick={closeModal} className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg">
          Cancelar
        </button>
      </div>
    </form>
  );

  const ClienteForm = () => (
    <form onSubmit={criarCliente} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm mb-2">Nome da Empresa *</label>
          <input 
            type="text" 
            value={novoCliente.empresa}
            onChange={(e) => setNovoCliente({...novoCliente, empresa: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-2">Nome do Contato *</label>
          <input 
            type="text" 
            value={novoCliente.contato}
            onChange={(e) => setNovoCliente({...novoCliente, contato: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-2">Telefone/WhatsApp *</label>
          <input 
            type="text" 
            value={novoCliente.telefone}
            onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-2">Endereço *</label>
          <input 
            type="text" 
            value={novoCliente.endereco}
            onChange={(e) => setNovoCliente({...novoCliente, endereco: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar Cliente'}
        </button>
        <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg">
          Cancelar
        </button>
      </div>
    </form>
  );

  const TransacaoForm = ({ tipo }) => {
    const [transacao, setTransacao] = useState({
      descricao: '',
      valor: '',
      categoria: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      adicionarTransacao(tipo, {
        ...transacao,
        valor: tipo === 'despesa' ? -Math.abs(parseFloat(transacao.valor)) : Math.abs(parseFloat(transacao.valor))
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Descrição *</label>
            <input 
              type="text" 
              value={transacao.descricao}
              onChange={(e) => setTransacao({...transacao, descricao: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Valor (R$) *</label>
            <input 
              type="number" 
              step="0.01" 
              value={transacao.valor}
              onChange={(e) => setTransacao({...transacao, valor: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Categoria *</label>
            <select 
              value={transacao.categoria}
              onChange={(e) => setTransacao({...transacao, categoria: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="Vendas">Vendas</option>
              <option value="Materiais">Materiais</option>
              <option value="Fixos">Fixos</option>
              <option value="Marketing">Marketing</option>
              <option value="Equipamentos">Equipamentos</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Salvando...' : `Salvar ${tipo === 'receita' ? 'Receita' : 'Despesa'}`}
          </button>
          <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg">
            Cancelar
          </button>
        </div>
      </form>
    );
  };

  const CompromissoForm = () => {
    const [compromisso, setCompromisso] = useState({
      titulo: '',
      tipo: 'entrega',
      data: '',
      hora: '',
      cliente: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      adicionarCompromisso(compromisso);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Título *</label>
            <input 
              type="text" 
              value={compromisso.titulo}
              onChange={(e) => setCompromisso({...compromisso, titulo: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Tipo *</label>
            <select 
              value={compromisso.tipo}
              onChange={(e) => setCompromisso({...compromisso, tipo: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
            >
              <option value="entrega">Entrega</option>
              <option value="reuniao">Reunião</option>
              <option value="producao">Produção</option>
              <option value="aniversario">Aniversário</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Data *</label>
            <input 
              type="date" 
              value={compromisso.data}
              onChange={(e) => setCompromisso({...compromisso, data: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm mb-2">Hora *</label>
            <input 
              type="time" 
              value={compromisso.hora}
              onChange={(e) => setCompromisso({...compromisso, hora: e.target.value})}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-2">Cliente/Pessoa *</label>
          <input 
            type="text" 
            value={compromisso.cliente}
            onChange={(e) => setCompromisso({...compromisso, cliente: e.target.value})}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600" 
            required
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Salvando...' : 'Salvar Compromisso'}
          </button>
          <button type="button" onClick={closeModal} className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg">
            Cancelar
          </button>
        </div>
      </form>
    );
  };

  // RENDERIZAÇÃO DAS SEÇÕES
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
                <p className="text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">A Receber</p>
                <p className="text-2xl font-bold text-white">
                  R$ {orders.reduce((sum, order) => sum + (order.saldo_restante || 0), 0).toFixed(2)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Faturamento Total</p>
                <p className="text-2xl font-bold text-white">
                  R$ {orders.reduce((sum, order) => sum + (order.valor_total || 0), 0).toFixed(2)}
                </p>
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
                <p className="text-2xl font-bold text-emerald-500">
                  R$ {transactions.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0).toFixed(2)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Despesas</p>
                <p className="text-2xl font-bold text-red-500">
                  R$ {Math.abs(transactions.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0)).toFixed(2)}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Saldo</p>
                <p className="text-2xl font-bold text-emerald-500">
                  R$ {transactions.reduce((sum, t) => sum + t.valor, 0).toFixed(2)}
                </p>
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
        <button 
          onClick={() => openModal('pedido')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Pedido
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Buscar pedidos..." 
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600">
              <option>Todos os status</option>
              {statusOptions.map((status, idx) => (
                <option key={idx}>{status}</option>
              ))}
            </select>
            <input type="date" className="bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold text-lg">{order.cliente_empresa}</h3>
                  <p className="text-gray-400 text-sm">Pedido: {order.dataPedido}</p>
                  <p className="text-gray-400 text-sm">Status: {order.status}</p>
                  {order.dataEntrega && <p className="text-gray-400 text-sm">Entrega: {order.dataEntrega}</p>}
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">R$ {order.valor_total.toFixed(2)}</p>
                  <p className="text-green-400 text-sm">Entrada: R$ {order.entrada_paga.toFixed(2)}</p>
                  <p className="text-orange-400 text-sm">A receber: R$ {order.saldo_restante.toFixed(2)}</p>
                </div>
              </div>
              
              {/* Detalhes dos itens */}
              <div className="mt-4 pt-4 border-t border-gray-600">
                <h4 className="text-white font-medium mb-2">Itens:</h4>
                {order.itens?.map((item, idx) => (
                  <div key={idx} className="bg-gray-600 p-3 rounded mb-2 text-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div>
                        <span className="text-gray-300 font-medium">Modelo:</span>
                        <p className="text-white">{item.modelo}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-medium">Cor:</span>
                        <p className="text-white">{item.cor}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-medium">Qtd:</span>
                        <p className="text-white">{item.quantidade_total}</p>
                      </div>
                      <div>
                        <span className="text-gray-300 font-medium">Personalização:</span>
                        <p className="text-white">{item.personalizacao}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="text-blue-400 hover:text-blue-300 bg-blue-900/20 px-3 py-1 rounded">
                  <Edit className="w-4 h-4 inline mr-1" />
                  Editar
                </button>
                <button className="text-red-400 hover:text-red-300 bg-red-900/20 px-3 py-1 rounded">
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Nenhum pedido encontrado. Clique em "Novo Pedido" para começar.
          </div>
        )}
      </div>
    </div>
  );

  const renderClientes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Clientes</h2>
        <button 
          onClick={() => openModal('cliente')}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Buscar clientes..." 
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Empresa</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Contato</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Telefone</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Endereço</th>
                <th className="text-left px-6 py-4 text-gray-300 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    {editingClient === client.id ? (
                      <input
                        type="text"
                        value={novoCliente.empresa}
                        onChange={(e) => setNovoCliente({...novoCliente, empresa: e.target.value})}
                        className="w-full p-2 bg-gray-600 text-white rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-white font-medium">{client.empresa}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingClient === client.id ? (
                      <input
                        type="text"
                        value={novoCliente.contato}
                        onChange={(e) => setNovoCliente({...novoCliente, contato: e.target.value})}
                        className="w-full p-2 bg-gray-600 text-white rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-gray-300">{client.contato}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingClient === client.id ? (
                      <input
                        type="text"
                        value={novoCliente.telefone}
                        onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})}
                        className="w-full p-2 bg-gray-600 text-white rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-gray-300">{client.telefone}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingClient === client.id ? (
                      <input
                        type="text"
                        value={novoCliente.endereco}
                        onChange={(e) => setNovoCliente({...novoCliente, endereco: e.target.value})}
                        className="w-full p-2 bg-gray-600 text-white rounded border border-gray-500"
                      />
                    ) : (
                      <span className="text-gray-300">{client.endereco}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingClient === client.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={salvarEdicaoCliente}
                          className="text-green-400 hover:text-green-300 bg-green-900/20 px-2 py-1 rounded"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelarEdicaoCliente}
                          className="text-gray-400 hover:text-gray-300 bg-gray-900/20 px-2 py-1 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => iniciarEdicaoCliente(client)}
                          className="text-blue-400 hover:text-blue-300 bg-blue-900/20 px-2 py-1 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => excluirCliente(client.id, client.empresa)}
                          className="text-red-400 hover:text-red-300 bg-red-900/20 px-2 py-1 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {clients.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Nenhum cliente encontrado. Clique em "Novo Cliente" para começar.
          </div>
        )}
      </div>
    </div>
  );

  const renderFinanceiro = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Filtrar por:</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => openModal('receita')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Receita
          </button>
          <button 
            onClick={() => openModal('despesa')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Despesa
          </button>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Mostrar Filtros
          </button>
        </div>
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
              <p className="text-2xl font-bold text-emerald-500">
                R$ {transactions.reduce((sum, t) => sum + t.valor, 0).toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Receitas Totais</p>
              <p className="text-2xl font-bold text-green-500">
                R$ {transactions.filter(t => t.tipo === 'receita').reduce((sum, t) => sum + t.valor, 0).toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Despesas Totais</p>
              <p className="text-2xl font-bold text-red-500">
                R$ {Math.abs(transactions.filter(t => t.tipo === 'despesa').reduce((sum, t) => sum + t.valor, 0)).toFixed(2)}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-500">
                R$ {orders.reduce((sum, order) => sum + (order.saldo_restante || 0), 0).toFixed(2)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Fluxograma de Caixa</h3>
            <button className="text-emerald-500 hover:text-emerald-400 text-sm flex items-center gap-1">
              <RefreshCw className="w-4 h-4" />
              Atualizar
            </button>
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
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {transactions.slice(-10).reverse().map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white text-sm">{transaction.descricao}</p>
                  <p className="text-gray-400 text-xs">{transaction.data} • {transaction.categoria}</p>
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
          <button 
            onClick={() => openModal('compromisso')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Compromisso
          </button>
          <button 
            onClick={() => setAgendaViewType(agendaViewType === 'lista' ? 'calendario' : 'lista')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            {agendaViewType === 'lista' ? <CalendarDays className="w-4 h-4" /> : <List className="w-4 h-4" />}
            {agendaViewType === 'lista' ? 'Calendário' : 'Lista'}
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'hoje', label: 'Hoje' },
            { id: 'semana', label: 'Esta Semana' },
            { id: 'mes', label: 'Este Mês' },
            { id: 'aniversarios', label: 'Aniversários' }
          ].map((view) => (
            <button 
              key={view.id}
              onClick={() => setAgendaView(view.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                agendaView === view.id ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-lg text-center">
            <p className="text-sm">Concluídos (Mês)</p>
            <p className="text-lg font-bold">25</p>
          </div>
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">
            <p className="text-sm">Atrasados</p>
            <p className="text-lg font-bold">3</p>
          </div>
          <div className="bg-green-500/20 text-green-400 p-3 rounded-lg text-center">
            <p className="text-sm">Entregues</p>
            <p className="text-lg font-bold">22</p>
          </div>
          <div className="bg-yellow-500/20 text-yellow-400 p-3 rounded-lg text-center">
            <p className="text-sm">Próximas Entregas</p>
            <p className="text-lg font-bold">8</p>
          </div>
        </div>

        {agendaViewType === 'lista' ? (
          <div className="space-y-3">
            {filtrarAgenda().map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.tipo === 'entrega' ? 'bg-blue-500' : 
                    item.tipo === 'reuniao' ? 'bg-green-500' : 
                    item.tipo === 'producao' ? 'bg-yellow-500' : 'bg-pink-500'
                  }`}></div>
                  <div>
                    <p className="text-white font-medium">{item.titulo}</p>
                    <p className="text-gray-400 text-sm">{item.cliente} • {item.data} às {item.hora}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'confirmado' ? 'bg-green-500/20 text-green-400' :
                    item.status === 'pendente' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {item.status}
                  </span>
                  <button className="text-gray-400 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-700 p-6 rounded-lg text-center">
            <CalendarDays className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">Visualização de Calendário</h3>
            <p className="text-gray-400 text-sm">
              A visualização de calendário será implementada em futuras versões.
              Por enquanto, use a visualização em lista.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCatalogo = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Catálogo Digital</h2>
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Eye className="w-4 h-4" />
            Visualizar Catálogo
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Configurações do Catálogo</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Catálogo Ativo</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={catalogConfig.ativo}
                  onChange={(e) => setCatalogConfig({...catalogConfig, ativo: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Nome da Loja</label>
              <input 
                type="text" 
                value={catalogConfig.nome}
                onChange={(e) => setCatalogConfig({...catalogConfig, nome: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Descrição</label>
              <textarea 
                rows="3"
                value={catalogConfig.descricao}
                onChange={(e) => setCatalogConfig({...catalogConfig, descricao: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Endereço Personalizado</label>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm">sellvibe.store/</span>
                <input 
                  type="text" 
                  value={catalogConfig.endereco}
                  onChange={(e) => setCatalogConfig({...catalogConfig, endereco: e.target.value})}
                  className="flex-1 bg-gray-700 text-white rounded-r-lg px-3 py-2 border border-gray-600 border-l-0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-2">Telefone/WhatsApp</label>
              <input 
                type="text" 
                value={catalogConfig.telefone}
                onChange={(e) => setCatalogConfig({...catalogConfig, telefone: e.target.value})}
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 border border-gray-600"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Cor Principal</label>
                <input 
                  type="color" 
                  value={catalogConfig.corPrincipal}
                  onChange={(e) => setCatalogConfig({...catalogConfig, corPrincipal: e.target.value})}
                  className="w-full h-10 bg-gray-700 rounded-lg border border-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Cor do Texto</label>
                <input 
                  type="color" 
                  value={catalogConfig.corTexto}
                  onChange={(e) => setCatalogConfig({...catalogConfig, corTexto: e.target.value})}
                  className="w-full h-10 bg-gray-700 rounded-lg border border-gray-600"
                />
              </div>
            </div>
          </div>
          
          <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg">
            Salvar Configurações
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Produtos no Catálogo</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={product.imagem} alt={product.nome} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-white font-medium">{product.nome}</p>
                    <p className="text-emerald-500 text-sm">R$ {product.preco.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Preview do Catálogo</h3>
        <div 
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center"
          style={{ backgroundColor: catalogConfig.corPrincipal + '10', borderColor: catalogConfig.corPrincipal }}
        >
          <div className="max-w-sm mx-auto">
            <h4 className="text-xl font-bold mb-2" style={{ color: catalogConfig.corPrincipal }}>
              {catalogConfig.nome}
            </h4>
            <p className="text-gray-400 text-sm mb-4">{catalogConfig.descricao}</p>
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-white text-sm">sellvibe.store/{catalogConfig.endereco}</p>
            </div>
          </div>
        </div>
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

  const renderModalContent = () => {
    switch(modalType) {
      case 'pedido': return <PedidoForm />;
      case 'cliente': return <ClienteForm />;
      case 'receita': return <TransacaoForm tipo="receita" />;
      case 'despesa': return <TransacaoForm tipo="despesa" />;
      case 'compromisso': return <CompromissoForm />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          {/* Logo integrada ao header sem fundo quadrado */}
          <div className="flex items-center gap-3 mb-8">
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => fileInputRef.current?.click()}
            >
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="w-[120px] h-[120px] object-contain rounded-lg"
                />
              ) : (
                <div className="w-[120px] h-[120px] bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center hover:border-emerald-500 transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-gray-400 text-xs">Upload Logo<br/>120x120</span>
                  </div>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
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

      {/* Modal */}
      <Modal>
        {renderModalContent()}
      </Modal>
    </div>
  );
}

export default Dashboard;