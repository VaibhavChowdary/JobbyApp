import {BrowserRouter, Switch, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import Jobs from './components/Jobs/Jobs'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import './App.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/jobs"
        component={() => (
          <Jobs
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
          />
        )}
      />
    </Switch>
  </BrowserRouter>
)

export default App
