"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  Plus,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Coffee,
  Smartphone,
  Heart,
  Sparkles,
  AlertCircle,
  Crown,
} from "lucide-react";

// Tipos
interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: Date;
}

interface Category {
  name: string;
  icon: any;
  color: string;
  total: number;
}

// Dados de exemplo
const initialTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    amount: 3500,
    category: "Salário",
    description: "Salário mensal",
    date: new Date(2024, 0, 1),
  },
  {
    id: "2",
    type: "expense",
    amount: 850,
    category: "Moradia",
    description: "Aluguel",
    date: new Date(2024, 0, 2),
  },
  {
    id: "3",
    type: "expense",
    amount: 120,
    category: "Alimentação",
    description: "Supermercado",
    date: new Date(2024, 0, 3),
  },
  {
    id: "4",
    type: "expense",
    amount: 45,
    category: "Transporte",
    description: "Uber",
    date: new Date(2024, 0, 3),
  },
  {
    id: "5",
    type: "expense",
    amount: 89,
    category: "Lazer",
    description: "Cinema e jantar",
    date: new Date(2024, 0, 4),
  },
  {
    id: "6",
    type: "expense",
    amount: 35,
    category: "Alimentação",
    description: "Café da manhã",
    date: new Date(2024, 0, 5),
  },
  {
    id: "7",
    type: "expense",
    amount: 199,
    category: "Compras",
    description: "Roupas",
    date: new Date(2024, 0, 5),
  },
];

const categoryIcons: Record<string, any> = {
  Moradia: Home,
  Alimentação: Utensils,
  Transporte: Car,
  Lazer: Coffee,
  Compras: ShoppingCart,
  Saúde: Heart,
  Tecnologia: Smartphone,
  Salário: Wallet,
};

const categoryColors: Record<string, string> = {
  Moradia: "from-blue-500 to-blue-600",
  Alimentação: "from-green-500 to-green-600",
  Transporte: "from-yellow-500 to-yellow-600",
  Lazer: "from-purple-500 to-purple-600",
  Compras: "from-pink-500 to-pink-600",
  Saúde: "from-red-500 to-red-600",
  Tecnologia: "from-cyan-500 to-cyan-600",
  Salário: "from-emerald-500 to-emerald-600",
};

export default function FinanceApp() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [dailyGoal] = useState(100); // Meta diária de gastos
  const [showPremium, setShowPremium] = useState(false);

  // Cálculos
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpenses;

  const todayExpenses = useMemo(() => {
    const today = new Date();
    return transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          t.date.toDateString() === today.toDateString()
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const expensesByCategory = useMemo(() => {
    const categories: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      });

    return Object.entries(categories)
      .map(([name, total]) => ({
        name,
        icon: categoryIcons[name] || ShoppingCart,
        color: categoryColors[name] || "from-gray-500 to-gray-600",
        total,
      }))
      .sort((a, b) => b.total - a.total);
  }, [transactions]);

  const biggestExpenseCategory = expensesByCategory[0];
  const isOverDailyGoal = todayExpenses > dailyGoal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                  FinanceFlow
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Controle financeiro inteligente
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPremium(!showPremium)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Premium</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Alerta de meta diária */}
        {isOverDailyGoal && (
          <div className="mb-6 bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-pulse">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-bold">⚠️ Atenção! Você ultrapassou sua meta diária!</p>
              <p className="text-sm opacity-90">
                Gastou R$ {todayExpenses.toFixed(2)} de R$ {dailyGoal.toFixed(2)} hoje
              </p>
            </div>
          </div>
        )}

        {/* Cards principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Saldo */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Saldo Total
              </p>
              <Wallet className="w-5 h-5 text-slate-400" />
            </div>
            <p
              className={`text-3xl font-bold ${
                balance >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              R$ {balance.toFixed(2)}
            </p>
            <div className="flex items-center gap-1 mt-2">
              {balance >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {balance >= 0 ? "Positivo" : "Negativo"}
              </span>
            </div>
          </div>

          {/* Investimentos */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Investimentos</p>
              <TrendingUp className="w-5 h-5 opacity-90" />
            </div>
            <p className="text-3xl font-bold">R$ {totalIncome.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">Este mês</p>
          </div>

          {/* Despesas */}
          <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Despesas</p>
              <TrendingDown className="w-5 h-5 opacity-90" />
            </div>
            <p className="text-3xl font-bold">R$ {totalExpenses.toFixed(2)}</p>
            <p className="text-xs opacity-75 mt-2">Este mês</p>
          </div>

          {/* Meta diária */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium opacity-90">Meta Diária</p>
              <Target className="w-5 h-5 opacity-90" />
            </div>
            <p className="text-3xl font-bold">R$ {todayExpenses.toFixed(2)}</p>
            <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((todayExpenses / dailyGoal) * 100, 100)}%`,
                }}
              />
            </div>
            <p className="text-xs opacity-75 mt-2">
              Limite: R$ {dailyGoal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Onde você está perdendo dinheiro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Maiores gastos por categoria */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                🔥 Onde você está perdendo dinheiro
              </h2>
            </div>

            <div className="space-y-4">
              {expensesByCategory.map((category, index) => {
                const Icon = category.icon;
                const percentage = (category.total / totalExpenses) * 100;

                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`bg-gradient-to-br ${category.color} p-2 rounded-lg`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {category.name}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {percentage.toFixed(1)}% do total
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        R$ {category.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${category.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    {index === 0 && (
                      <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                        ⚠️ Sua maior despesa!
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transações recentes */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Transações Recentes
              </h2>
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-2 rounded-lg transition-all duration-300 hover:scale-105">
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transactions.slice(0, 10).map((transaction) => {
                const Icon =
                  categoryIcons[transaction.category] || ShoppingCart;
                const isExpense = transaction.type === "expense";

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`bg-gradient-to-br ${
                          categoryColors[transaction.category] ||
                          "from-gray-500 to-gray-600"
                        } p-2 rounded-lg`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {transaction.category} •{" "}
                          {transaction.date.toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-bold ${
                        isExpense
                          ? "text-red-600 dark:text-red-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {isExpense ? "-" : "+"}R$ {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Premium */}
        {showPremium && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
              <button
                onClick={() => setShowPremium(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Desbloqueie o Premium
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Acesse estatísticas avançadas e recursos exclusivos
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Relatórios detalhados e insights
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Sincronização com bancos
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Sem anúncios
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Metas personalizadas ilimitadas
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white text-center mb-4">
                <p className="text-sm opacity-90 mb-1">Apenas</p>
                <p className="text-4xl font-bold mb-1">R$ 19,90</p>
                <p className="text-sm opacity-90">por mês</p>
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                Assinar Premium
              </button>

              <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
                Cancele quando quiser. Sem compromisso.
              </p>
            </div>
          </div>
        )}

        {/* Banner de anúncio (modo gratuito) */}
        <div className="mt-8 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            📢 Espaço para anúncios
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Remova anúncios com o plano Premium
          </p>
        </div>
      </main>
    </div>
  );
}
