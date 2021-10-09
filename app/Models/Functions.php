<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Functions extends Model
{
    
    public function scopeisLikeAndIlike() {
        // return 'ILIKE';
        return 'LIKE';
    }

}
