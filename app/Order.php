<?php


namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model

{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['status'];
    public function pizzas()
    {
        return $this->belongsToMany('App\Pizza', 'order_pizza', 'order_id', 'pizza_id')
            ->withPivot('quantity', 'price', 'total');
    }
}
