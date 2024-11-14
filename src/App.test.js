import { render, screen } from '@testing-library/react';
import { useStore } from '@nanostores/react';
import { GetTotalExpenses } from './services/GetTotalExpenses';
import Statistics from './components/Statistics';
import BalanceOverTime from './components/BalanceOverTime';

// Statistics.js
jest.mock('@nanostores/react', () => ({
  useStore: jest.fn(),
}))

jest.mock('./services/GetTotalExpenses.js', () => ({
  GetTotalExpenses: jest.fn(),
}))

describe('Statistics Component', () => {
  it('calculates average daily expense and highest spending category correctly', () => {
      const transactions = [
          { type: 'Expense', amount: 50, date: '2024-10-26', category: 'Food' },
          { type: 'Expense', amount: 20, date: '2024-10-26', category: 'Travel' },
          { type: 'Expense', amount: 30, date: '2024-10-27', category: 'Food' }
      ]
      
      useStore.mockReturnValue(transactions)
      GetTotalExpenses.mockReturnValue(100)

      render(<Statistics />) 

      expect(screen.getByText('Average Daily Expense: 50.00 €')).toBeInTheDocument()
      expect(screen.getByText('Highest Spending Category: Food (80.00 €)')).toBeInTheDocument()
  })
})

describe('BalanceOverTime Component', () => {
  beforeEach(() => {
      // Clear any previous mock data
      useStore.mockClear();
  });

  test('renders without crashing', () => {
      useStore.mockReturnValue([]);
      const { container } = render(<BalanceOverTime />);
      expect(container).toBeInTheDocument();
  });
})


/*
// Settings.js
describe('Settings Component', () => {
  const mockUserSettings = {
      totalBudgetLimit: 300,
      categoryLimits: {
          Food: 100,
          Transport: 50,
      }
  };

  it('renders the settings form correctly', () => {
      render(<Settings userSettings={mockUserSettings} />);
      expect(screen.getByText(/budget settings/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/total budget limit/i)).toBeInTheDocument();
  });

  it('shows error when category limits exceed total budget limit', () => {
      render(<Settings userSettings={mockUserSettings} />);
      fireEvent.change(screen.getByLabelText(/total budget limit/i), { target: { value: 300 } });
      fireEvent.change(screen.getByLabelText(/Food/i), { target: { value: 400 } });
      expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });
});


// ExportButton.js
describe('ExportButton Component', () => {
  it('exports data to CSV when clicked', () => {
      const data = [{ name: 'John', age: 30 }];
      const headers = ['name', 'age'];

      render(<ExportButton data={data} headers={headers} />);
      
      fireEvent.click(screen.getByRole('button', { name: /export csv/i }));

      expect(screen.getByText(/data exported/i)).toBeInTheDocument();
  });
});


// AnalysisGraph.js
describe('AnalysisGraph Component', () => {
  it('renders the analysis graph', () => {
      const transactions = [
          { category: 'Food', amount: '50', type: 'Expense' },
          { category: 'Food', amount: '150', type: 'Income' },
          { category: 'Travel', amount: '200', type: 'Expense' },
      ];

      useStore.mockReturnValue(transactions);

      render(<AnalysisGraph />);

      expect(screen.getByText(/analysis graph/i)).toBeInTheDocument();
  });

  it('calculates income and expenses correctly per category', () => {
      const transactions = [
          { category: 'Food', amount: '50', type: 'Expense' },
          { category: 'Food', amount: '150', type: 'Income' },
          { category: 'Travel', amount: '200', type: 'Expense' },
      ];

      useStore.mockReturnValue(transactions);

      render(<AnalysisGraph />);
      
      expect(screen.getByText('Income')).toBeInTheDocument(); 
      expect(screen.getByText('Expense')).toBeInTheDocument(); 
  });
});
*/

/*
jest.mock('./stores/transactionStore', () => ({
  transactionsStore: {
      subscribe: jest.fn((callback) => {
          const mockTransactions = [
              { description: 'Salary', amount: '2000', type: 'Income', date: '2024-01-01' },
              { description: 'Groceries', amount: '150', type: 'Expense', date: '2024-01-02' },
          ];
          callback(mockTransactions);
          return { unsubscribe: jest.fn() };
      }),
  },
}));

jest.mock('./utils/onRenderCallback', () => ({
  onRenderCallback: jest.fn(),
}));

describe('Dashboard Component', () => {
  it('captures performance data correctly', () => {
      render(<Dashboard />);

      expect(utils.onRenderCallback).toHaveBeenCalled(); // Check if onRenderCallback was called
      expect(utils.onRenderCallback).toHaveBeenCalledTimes(1); // Check the number of times it was called

      const profilerData = utils.onRenderCallback.mock.calls[0][0]; // Get the first call data

      expect(profilerData).toMatchObject({
          id: 'Dashboard',
          phase: expect.any(String), // phase will be 'mount' or 'update'
          actualDuration: expect.any(Number),
          baseDuration: expect.any(Number),
          startTime: expect.any(Number),
          commitTime: expect.any(Number),
          interactions: expect.any(Array),
      });
  });
});
*/