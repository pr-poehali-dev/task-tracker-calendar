import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'birthday' | 'holiday' | 'sale' | 'other';
}

interface ShoppingItem {
  id: string;
  title: string;
  checked: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Купить подарок маме 🎁', completed: false, priority: 'high', category: 'личное' },
    { id: '2', title: 'Записаться к косметологу', completed: false, priority: 'medium', category: 'красота' },
    { id: '3', title: 'Заказать торт на ДР', completed: true, priority: 'high', category: 'праздники' },
  ]);

  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'День рождения мамы 🎂', date: new Date(2025, 10, 15), type: 'birthday' },
    { id: '2', title: 'Распродажа Zara', date: new Date(2025, 10, 20), type: 'sale' },
    { id: '3', title: 'Новый Год 🎄', date: new Date(2025, 11, 31), type: 'holiday' },
  ]);

  const [shopping, setShopping] = useState<ShoppingItem[]>([
    { id: '1', title: 'Молоко', checked: false },
    { id: '2', title: 'Хлеб', checked: true },
    { id: '3', title: 'Фрукты', checked: false },
  ]);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventType, setNewEventType] = useState<'birthday' | 'holiday' | 'sale' | 'other'>('other');
  const [newShoppingItem, setNewShoppingItem] = useState('');

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
        priority: newTaskPriority,
        category: 'личное'
      }]);
      setNewTaskTitle('');
    }
  };

  const addEvent = () => {
    if (newEventTitle.trim() && date) {
      setEvents([...events, {
        id: Date.now().toString(),
        title: newEventTitle,
        date: date,
        type: newEventType
      }]);
      setNewEventTitle('');
    }
  };

  const addShoppingItem = () => {
    if (newShoppingItem.trim()) {
      setShopping([...shopping, {
        id: Date.now().toString(),
        title: newShoppingItem,
        checked: false
      }]);
      setNewShoppingItem('');
    }
  };

  const toggleShopping = (id: string) => {
    setShopping(shopping.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-primary text-primary-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'birthday': return '🎂';
      case 'holiday': return '🎉';
      case 'sale': return '🛍️';
      default: return '📌';
    }
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const upcomingEvents = events.filter(e => e.date >= new Date()).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-mint-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <Icon name="Sparkles" size={40} className="text-secondary" />
            Мой Планировщик
            <Icon name="Heart" size={40} className="text-primary" />
          </h1>
          <p className="text-muted-foreground text-lg">Твой милый помощник в организации дел ✨</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-scale-in">
          <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200 hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="CheckCircle2" size={24} className="text-green-600" />
                Задачи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completedTasks}/{totalTasks}</div>
              <p className="text-sm text-muted-foreground mt-1">выполнено</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200 hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="Calendar" size={24} className="text-orange-600" />
                События
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{upcomingEvents}</div>
              <p className="text-sm text-muted-foreground mt-1">предстоящих</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-mint-100 to-mint-50 border-green-200 hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Icon name="ShoppingBag" size={24} className="text-orange-500" />
                Покупки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{shopping.filter(s => !s.checked).length}</div>
              <p className="text-sm text-muted-foreground mt-1">осталось купить</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tasks" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/80 backdrop-blur">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-200 data-[state=active]:to-green-100">
              <Icon name="ListTodo" size={20} className="mr-2" />
              Задачи
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-200 data-[state=active]:to-orange-100">
              <Icon name="CalendarDays" size={20} className="mr-2" />
              Календарь
            </TabsTrigger>
            <TabsTrigger value="shopping" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-mint-200 data-[state=active]:to-mint-100">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Покупки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Мои задачи</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600">
                        <Icon name="Plus" size={18} className="mr-1" />
                        Добавить
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gradient-to-br from-green-50 to-orange-50">
                      <DialogHeader>
                        <DialogTitle>Новая задача</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="task-title">Название</Label>
                          <Input
                            id="task-title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Например: купить цветы"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="task-priority">Приоритет</Label>
                          <Select value={newTaskPriority} onValueChange={(value: any) => setNewTaskPriority(value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Низкий</SelectItem>
                              <SelectItem value="medium">Средний</SelectItem>
                              <SelectItem value="high">Высокий</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={addTask} className="w-full bg-gradient-to-r from-green-400 to-green-500">
                          Добавить задачу
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white border border-green-100 hover:border-green-200 transition-all hover-scale"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
                    />
                    <span className={`flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </span>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority === 'high' ? 'Важно' : task.priority === 'medium' ? 'Средне' : 'Низко'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle>Календарь</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-orange-200"
                  />
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>События</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600">
                          <Icon name="Plus" size={18} className="mr-1" />
                          Добавить
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gradient-to-br from-orange-50 to-green-50">
                        <DialogHeader>
                          <DialogTitle>Новое событие</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <Label htmlFor="event-title">Название</Label>
                            <Input
                              id="event-title"
                              value={newEventTitle}
                              onChange={(e) => setNewEventTitle(e.target.value)}
                              placeholder="Например: День рождения подруги"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="event-type">Тип события</Label>
                            <Select value={newEventType} onValueChange={(value: any) => setNewEventType(value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="birthday">День рождения</SelectItem>
                                <SelectItem value="holiday">Праздник</SelectItem>
                                <SelectItem value="sale">Распродажа</SelectItem>
                                <SelectItem value="other">Другое</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={addEvent} className="w-full bg-gradient-to-r from-orange-400 to-orange-500">
                            Добавить событие
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {events.sort((a, b) => a.date.getTime() - b.date.getTime()).map(event => (
                    <div
                      key={event.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-green-50 border border-orange-100 hover-scale"
                    >
                      <span className="text-2xl">{getEventIcon(event.type)}</span>
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shopping" className="space-y-4">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Список покупок</span>
                  <div className="flex gap-2">
                    <Input
                      value={newShoppingItem}
                      onChange={(e) => setNewShoppingItem(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addShoppingItem()}
                      placeholder="Добавить товар..."
                      className="w-48"
                    />
                    <Button
                      onClick={addShoppingItem}
                      size="icon"
                      className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
                    >
                      <Icon name="Plus" size={18} />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shopping.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white border border-green-100 hover:border-green-200 transition-all hover-scale"
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleShopping(item.id)}
                      className="data-[state=checked]:bg-green-400 data-[state=checked]:border-green-400"
                    />
                    <span className={`flex-1 ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                      {item.title}
                    </span>
                    {item.checked && <Icon name="Check" size={18} className="text-green-500" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;